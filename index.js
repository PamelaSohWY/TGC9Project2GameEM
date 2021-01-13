const express = require('express');
const cors = require('cors');
const router = express.Router();
const MongoUtil = require('./MongoUtil');
const UserId = require('mongodb').UserId;

require('dotenv').config();

const app =express();
app.use(cors())

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

async function main(){

    const MONGO_URL= process.env.MONGO_URL;
    await MongoUtil.connect(MONGO_URL, 'game');
    let db=MongoUtil.getDB();

    app.post('/', async(req,res)=>{
        let {name} = req.body;
        let results = await db.collection('user').insertOne({name});
        console.log (results)
        res.send({'insertid':results.insertid})

    app.get ('/', async(req,res) => {
        let results = await db.collection('user').find().toArray();
        console.log("results")
        res.render('user', {
            'Name':results
        })
    })
})
}
main();

app.listen(3000, ()=>{
    console.log("Express is running")
})