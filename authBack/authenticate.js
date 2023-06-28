const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 
const { SECRET_KEY } = process.env;
const HttpError = require('./httpError');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_CONNECTION_STRING;


const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
  }
});

const database = client.db("lambda-auth");
const auth = database.collection("auth");

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== 'Bearer') { 
        next(new HttpError(401, "Not authorized"));
    }
    try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const o_id = new ObjectId(id);
    const user = await auth.findOne({ "_id": o_id });
        if (!user || !user.token || user.token !== token) { 
            next(new HttpError(401, "User not found"));
        }
        req.user = user; // в об'єкт req записує інформацію про юзера, який робить запит
        next();
    } catch (error) {
        next(new HttpError(401, "User not found"));
    }
};

module.exports = authenticate;