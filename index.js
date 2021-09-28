const express = require("express")
// const cors = require('cors');
const app = express();
// app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const Booking = require('./routes/Booking')
app.use('/Booking',Booking)
app.listen(6000,()=>{
    console.log("running in port 6000");
})