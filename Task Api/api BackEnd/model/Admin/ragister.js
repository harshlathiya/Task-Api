const mongoose = require('mongoose');
const path = require('path')
const imgpath = ("/uploads/Admin")
const multer = require('multer')

const ragisterschems = mongoose.Schema({
    name : {
        type : String 
    },
    password : {
        type : String 
    },
    city : {
        type : String 
    },
    hobby : {
        type : Array 
    },
    gender : {
        type : String 
    },
    userids : {
        type : Array,
        ref:'users' 
    },
    taskid : {
        type : Array,
        ref:'task' 
    },
    Adminimage : {
        type : String 
    },
    email : {
        type : String 
        
    }
})


const Imagestorage =  multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,path.join(__dirname , "../.." ,imgpath))
    },

    
    filename :(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now());
    }
})


ragisterschems.statics.uplodeimg = multer({storage : Imagestorage}).single('Adminimage');
ragisterschems.statics.imageAdminPath = imgpath;

const ragister = mongoose.model('ragister',ragisterschems);

module.exports = ragister;  