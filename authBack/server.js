require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = require('./app');
const uri = process.env.MONGODB_CONNECTION_STRING;

const PORT = process.env.PORT || 8081;

const client = new MongoClient(uri, {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
  }
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};



run().catch(console.dir);

module.exports = {
  client,
}