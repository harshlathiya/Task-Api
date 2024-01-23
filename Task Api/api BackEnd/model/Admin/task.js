const mongoose = require('mongoose');

const multer = require('multer')

const taskschems = mongoose.Schema({
    taskname : {
        type : String 
    },
    tasktype : {
        type : String 
    },
    date : {
        type : String 
    },
    tasks : {
        type : String 
    },
    userids : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'users' ,
        required : true
    },
    adminid:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'ragister' ,
        required : true
    },
    status:{
        type : String
    }
})



const task = mongoose.model('task',taskschems);

module.exports = task;  