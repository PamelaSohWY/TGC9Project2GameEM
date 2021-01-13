const express = require('express');
const router = express.Router();
const MongoUtil = require('../MongoUtil');
const UserId = require('mongodb').UserId;

//Start of route 1
router.get('/', async(req,res) => {
    let db = MongoUtil.getDB();
    let faults = await db.collection('users').find().toArray();
    res.send(users);
}) // end route 1 

//Start of route 2 
router.get('/:id', async(req,res)=> {
let db = MongoUtil.getDB();
let fault = await db.collection('users').findOne({
    '_id': UserId(req.params.id)
});
res.send(fault);
})// end route 2

//start of route 3
router.post('/',async (req,res)=> {
    let db = MongoUtil.getDB();

    //extract the fields 
    let{ 
        _id, name, email, date
    } = req.body; 

    tags= tags || []; 
    tags = Array.isArray(tags) ? tags:[tags];

    date= new Date(date);

    let results = await db.collection('users').insertOne({
    _id, name, email, date 
    })

    res.send({
        'message': 'New user id has been created successfully!'
        'insertedid':results.insertedId
    })

})//end of route 3

//start of route 4
router.patch('/:id', async(req,res) =>{
    let db= MongoUtil.getDB();
    let id=req.params.id;

    let {
        _id, name, email, date
    } = req.body

    tags = tags||[];

    tags = Array.isArray(tags)?tags:[tags];

    date= new Date(date);

    let results = await db.collection('users').updateOne({
        '_id':UserId(id)
    }, 
    {
        '$set': {
            _id,name,email, date
        }
    }
    );

    res.send({
        'message':'Update done', 
        'status':'OK'
    })

}) // end of Route 4

// Start of Route 5 
router.delete('/:id', async(req,res)=> {
    let db = MongoUtil.getDB();
    await db.collection('users').deleteOne({
        _id:UserId(req.params.id)
    })

    res.send({
        'status':'Ok'
    })
})

module.exports = router; 