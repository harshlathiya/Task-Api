const express = require('express');

const routes =  express.Router();
const passport = require('passport');
const ragister = require('../../../../model/Admin/ragister');
const task = require('../../../../model/Admin/task');
const Admincontroller = require('../../../../controller/Api/V1/Admin/AdminController');
const taskController = require('../../../../controller/Api/V1/task/taskController');



routes.post('/ragister',ragister.uplodeimg,Admincontroller.ragister)
routes.put('/editprofile/:id',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),ragister.uplodeimg,Admincontroller.editprofile)
routes.get('/profile',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),Admincontroller.profile)
routes.post('/add_task',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),taskController.add_task)
routes.post('/login',Admincontroller.login)
routes.get("/faillogin" ,async (req,res) =>{

    return res.status(400).json({msg:'invalid Login',status:0});

});


routes.get('/view_All_user',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),Admincontroller.view_All_user)
routes.get('/viewalltask',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),Admincontroller.viewalltask)
routes.get('/viewmytask_given',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),Admincontroller.viewmytask_given)


routes.use('/user',require('../user/user'));

routes.get('/viewallAdmin',passport.authenticate('jwt',{failureRedirect:"/admin/faillogin"}),Admincontroller.viewalladmin)

module.exports = routes ;

