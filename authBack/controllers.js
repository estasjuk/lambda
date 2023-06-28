require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require("./utils");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_CONNECTION_STRING;
const { SECRET_KEY } = process.env;

const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
  }
});

const database = client.db("lambda-auth");
const auth = database.collection("auth");

const randomExpireTime = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await auth.findOne({ email });
  if (user) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await auth.insertOne({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      userId: result.insertedId,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.query;
  const user = await auth.findOne({ email });
  if (!user) {
   return res.status(401).json({ message: 'Email or password invalid' });
  };

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
   return res.status(401).json({ message: 'Email or password invalid' });
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: `${randomExpireTime(30, 60)}h` });
  await auth.findOneAndUpdate({ _id: payload.id },  {$set: {"token": token}});

  res.status(200).json({
      token,
  });
};

const getMe1 = (req, res) => {
  const { email } = req.user;
  const reqNum = req.url.slice(-1);
    res.status(200).json({
         data: { username: email }, request_num: reqNum,
    })
};

const getMe2 = (req, res) => {
  const { email } = req.user;
  const { reqNum } = req.params;
    res.status(200).json({
         data: { username: email }, request_num: reqNum,
    })
};


module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getMe1: ctrlWrapper(getMe1),
  getMe2: ctrlWrapper(getMe2),
};