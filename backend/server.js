const express = require('express')
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const url = 'mongodb+srv://charan:1234@cluster0.dztrl2p.mongodb.net/';
const client = new MongoClient(url);
client.connect();
console.log('Connected successfully to server okay');
const db = client.db('passop');
const collection = db.collection('passwords');
//get
app.get('/',async (req, res) => {
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//post
app.post('/',async (req, res) => {
   const password=await req.body 
   const insertResult = await collection.insertOne(password);
    res.send({insertResult})
})
//delete
app.delete('/',async (req, res) => {
    console.log("hi")
    const password=req.body
    const deleteResult = await collection.deleteOne(password);
    res.send(deleteResult)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})