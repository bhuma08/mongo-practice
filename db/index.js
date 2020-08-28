const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'celebs'

let db;

const init = () => {
    return MongoClient.connect(connectionUrl).then((client) => {
      db = client.db(dbName)
      console.log('connected to database!', dbName)
    })
}

const index = () => {
  const collection = db.collection('comedians')
  return collection.find({}).toArray()
}

const show = id => {
  const collection = db.collection('comedians')
  return collection.find({ _id: ObjectId(id) }).toArray()
}

const create = newData => {
  const collection = db.collection('comedians')
  return collection.insertOne(newData)
}


const update = id => {
  const collection = db.collection('comedians')
  return collection.findOneAndUpdate({ _id: ObjectId(id) }, { $inc: { age: 1 } }, { returnOriginal: false })
}

const destroy = id => {
  const collection = db.collection('comedians')
  return collection.deleteOne({ _id: ObjectId(id) })
}

module.exports = { init, index, show, create, update, destroy }