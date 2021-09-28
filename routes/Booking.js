const express =  require("express")
const router =  express.Router()
const { MongoClient ,ObjectId} = require('mongodb');
const url = 'mongodb://localhost:27017';


router.get("/getBooking",(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
        db.collection("booking").find().toArray((err,data)=>{
            console.log(data);
            res.send(data)
        })
        })
})

router.get("/getBookingActive",(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
        db.collection("booking").find({record_status: 1}).toArray((err,data)=>{
            console.log(data);
            res.send(data)
        })
        })
})

router.post("/getBookingParticular",(req,res)=>{
    MongoClient.connect(url,(err,con)=>{
    var db = con.db("irctc")
     db.collection("booking").findOne({_id:ObjectId(req.body._id)},(err,data)=>{
       res.send(data)
     })
     
    });
  
})

router.post("/booking",(req,res)=>{
    console.log(req.body)
    MongoClient.connect(url,(err,con)=>{
    var db = con.db("irctc")
     db.collection("booking").insertOne(req.body,(err,data)=>{
         console.log(data);
         res.send("registered successfully")
     })
    });
})


router.patch('/deleteBooking-soft',(req,res)=>{
    console.log(req.params);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("booking").updateOne({_id:ObjectId(req.body._id)},
         {
             $set:{
                record_status:0
             }
         },
         function(err,data){
             console.log(data)
             res.send("deleted successfully")
         })
        });
})

router.patch('/updateStatus',(req,res)=>{
    console.log(req.params);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("booking").updateOne({_id:ObjectId(req.body._id)},
         {
             $set:{
                booking_status:req.body.booking_status
             }
         },
         function(err,data){
             console.log(data)
             res.send("updated successfully")
         })
        });
})


router.delete('/deleteBooking/:id',(req,res)=>{
    console.log(req.params);
    MongoClient.connect(url,(err,con)=>{
        var db = con.db("irctc")
         db.collection("booking").deleteOne({_id:ObjectId(req.params.id)},(err,data)=>{
             console.log(data);
             res.send("deleted successfully")
         })
        });
})


module.exports = router;