const ragister = require('../../../../model/Admin/ragister');
const user = require('../../../../model/user/ragister');
const task = require('../../../../model/Admin/task');
const bcrypt = require('bcrypt');
const express = require('express');
const jwtdata = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')

module.exports.ragister = async (req, res) => {
    try {
        if (req.body.password == req.body.cpass) {
            //delete(req.body.cpass);
            //console.log(req.body)


            let check = await ragister.findOne({ email: req.body.email })

            if (check) {
                console.log( req.file);
                await fs.unlinkSync(req.file.path);
                return res.status(200).json({ msg: 'Email alrady  Ragisted....', status: 1 });
            }
            else {

                var imgpath = '';
                if (req.file) {
                    imgpath = ragister.imageAdminPath + "/" + req.file.filename;
                }
                req.body.Adminimage = imgpath;
                req.body.password = await bcrypt.hash(req.body.password, 10);

                let data = await ragister.create(req.body);

                if (data) {
                    return res.status(200).json({ msg: 'Data Inserted Succ....', status: 1, rec: data });
                }
                else {
                    return res.status(200).json({ msg: 'Data not Inserted Succ....', status: 0 });
                }
            }


        }
        else {
            console.log('password not Match');
            return res.status(200).json({ msg: 'Confirm Password not Match', status: 0 });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }

}


module.exports.login = async (req, res) => {
    try {
        let check = await ragister.findOne({ email: req.body.email })


        if (check) {
            if (await bcrypt.compare(req.body.password, check.password)) {
                let token = await jwtdata.sign({ data: check }, 'batch', { expiresIn: '1h' })
                return res.status(200).json({ msg: 'Login Succ.. & token granted Succ....', status: 1, rec: token });
            }
            else {
                return res.status(200).json({ msg: 'Password not match', status: 0 });
            }
        }
        else {
            console.log(' invalid email ');
            return res.status(200).json({ msg: 'invalid email', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}


module.exports.viewalladmin = async (req, res) => {

    try {
        let admin = await ragister.find({});
        if (admin) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: admin });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}



module.exports.profile = async (req, res) => {

    try {
        let admin = await ragister.findById(req.user.id).populate('userids').exec();
        if (admin) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: admin });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}


module.exports.editprofile = async (req, res) => {

    try {


        if (req.file) {
            console.log(req.file);
            let oldimgData = await ragister.findById(req.params.id);

            if (oldimgData.Adminimage) {


                let FullPath = path.join(__dirname, "../../../..", oldimgData.Adminimage);
                console.log(FullPath)
                await fs.unlinkSync(FullPath);
            }
            var imagePath = '';
            imagePath = ragister.imageAdminPath + "/" + req.file.filename;
            req.body.Adminimage = imagePath;
        }
        else {
            let olddata = await ragister.findById(req.params.id);
            var imgpath = '';
            if (olddata) {
                imgpath = olddata.Adminimage;
            }
            req.body.Adminimage = imgpath;
        }

        let adminupdated = await ragister.findByIdAndUpdate(req.params.id, req.body);

        if (adminupdated) {
            return res.status(200).json({ msg: 'Data Updated Succ....', status: 1, rec: adminupdated });
        }
        else {
            return res.status(400).json({ msg: 'not Updated Succ..', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}




//user


module.exports.view_All_user = async (req, res) => {

    try {
        let userdata = await user.find({});
        if (userdata) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: userdata });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}


module.exports.viewalltask = async (req, res) => {

    try {
        let taskdata = await task.find({}).populate('userids').exec();
       
        if (taskdata) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: taskdata });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}


module.exports.viewmytask_given = async (req, res) => {

    try {
        let taskdata = await task.find({adminid : req.user.id}).populate('userids').exec();
       
        if (taskdata) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: taskdata });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}