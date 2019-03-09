import { Mongo } from 'meteor/mongo'
import mongodb from 'mongodb'

const client = new mongodb.MongoClient()
const Greetings = new Mongo.Collection("greetings")

export default Greetings
