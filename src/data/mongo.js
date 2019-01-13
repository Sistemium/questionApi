import log from 'sistemium-telegram/services/log';

const { error } = log('question:mongo');
const { MongoClient, ObjectId } = require('mongodb');


const url = 'mongodb://localhost:27017';
const dbName = 'QuestionDB';

let questionDB;

(async () => {

  const client = new MongoClient(url, { useNewUrlParser: true });

  try {
    await client.connect();

    questionDB = client.db(dbName);

  } catch (err) {
    error(err);
  }

  // client.close();

})();

export { find, findAll };

async function find(name, id) {

  return questionDB.collection(name).find({ _id: new ObjectId(id) }).toArray();

}

async function findAll(name) {

  return questionDB.collection(name).find().toArray();

}
