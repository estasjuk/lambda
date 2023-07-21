require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { ctrlWrapper } = require("../utils");
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_CONNECTION_STRING;
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

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

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, { expiresIn: `${randomExpireTime(30, 60)}h` });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});
  await auth.findOneAndUpdate({ _id: payload.id }, { $set: { accessToken, refreshToken } });

  res.status(200).json({
    accessToken,
    refreshToken,
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

const refresh = async (req, res) => { 

  const { refreshToken: token } = req.body;
  
  if (!token) { 
        next(new HttpError(401, "Not authorized"));
  }
  
  try {
  const {id} = jwt.verify(token, REFRESH_SECRET_KEY);
  const isExist = await auth.findOne({refreshToken: token});
  if(!isExist) {
      throw HttpError(403, "Token invalid");
  }

  const payload = {
      id,
  }

  const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {expiresIn: `${randomExpireTime(30, 60)}s`});
  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {expiresIn: "7d"});

  res.json({
      accessToken,
      refreshToken,
  })
}
catch(error) {
    throw HttpError(403, error.message);
}
};

const logout = async(req, res)=> {
  const {_id} = req.user;
  await auth.findOneAndUpdate({_id}, {"$set": {accessToken: "", refreshToken: ""}});
  res.json({
      message: "Logout success"
  })
}

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getMe1: ctrlWrapper(getMe1),
  getMe2: ctrlWrapper(getMe2),
  refresh: ctrlWrapper(refresh),
  logout: ctrlWrapper(logout),
};