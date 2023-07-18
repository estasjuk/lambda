const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 
const { ACCESS_SECRET_KEY } = process.env;
const HttpError = require('../helpers/httpError');
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
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);
    console.log(id);
        const o_id = new ObjectId(id);
        console.log(o_id);
        const user = await auth.findOne({ "_id": o_id });
        console.log(user);
        console.log(user.accessToken);
        console.log(token);
            if (!user || !user.accessToken || user.accessToken !== token) { 
                next(new HttpError(401, "User not found"));
            }
        req.user = user; // в об'єкт req записує інформацію про юзера, який робить запит
        next();
    } catch (error) {
        next(new HttpError(401, "User not found"));
    }
};

module.exports = authenticate;