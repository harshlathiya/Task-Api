const express = require('express');

const routes =  express.Router();
const passport = require('passport');

const ragister = require('../../../../model/user/ragister');
const userController = require('../../../../controller/Api/V1/user/userController');


routes.post('/add_user',passport.authenticate('jwt',{failureRedirect:"/admin/user/faillogin"}),ragister.uplodeimg,userController.add_user);
routes.get('/profile',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),userController.profile)
routes.get('/viewalltask',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),userController.viewalltask)
routes.get('/viewalltasks',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),userController.viewalltasks)
routes.get('/activetask/:id',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),userController.activetask)
routes.get('/Completetask/:id',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),userController.Completetask)
routes.put('/editprofile/:id',passport.authenticate('user',{failureRedirect:"/admin/faillogin"}),ragister.uplodeimg,userController.editprofile)
routes.post('/login',userController.login)

routes.get("/faillogin" ,async (req,res) =>{
   return res.status(400).json({ msg: 'INVALID LOGIN', status: 0 });
});


module.exports  =routes;