const ragister = require('../../../../model/user/ragister');
const admin = require('../../../../model/Admin/ragister');
const task = require('../../../../model/Admin/task');
const bcrypt = require('bcrypt');
const express = require('express');
const jwtdata = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')
const nodemailer = require("nodemailer");
const { log } = require('console');




module.exports.add_user = async(req,res)=>{
    try{
        if(req.body.password == req.body.cpass){
            //delete(req.body.cpass);
            //console.log(req.body)
            

            let check = await ragister.findOne({email:req.body.email})

            //console.log(req.file);
            if(check){
                await fs.unlinkSync(req.file.path);
                return res.status(200).json({msg:'Email alrady  Ragisted....',status:1});
            }
            else{

                var imgpath = '';
                if(req.file){
                    imgpath = ragister.imageAdminPath+"/"+req.file.filename;
                }
                req.body.Adminimage = imgpath;
                var user_pass = req.body.password;
                req.body.password = await bcrypt.hash(req.body.password,10);
                req.body.adminids = req.user.id;
                let data =await ragister.create(req.body);

                if(data){

                    var comm = true;
                    if(comm){
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: true,
                            auth: {
                              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                              user: "harshlathiya91@gmail.com",
                              pass: "ejlzrfzgkzvcpcpv",
                            },
                          });
                          
                          let user = req.body.name;
                          const info = await transporter.sendMail({
                            from: 'harshlathiya91@gmail.com', // sender address
                            to: `${req.body.email}`, // list of receivers
                            subject: "Contact", // Subject line
                            text: "Hello user ", // plain text body
                            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                            <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
                            
                            <head>
                                <meta charset="UTF-8">
                                <meta content="width=device-width, initial-scale=1" name="viewport">
                                <meta name="x-apple-disable-message-reformatting">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta content="telephone=no" name="format-detection">
                                <title></title>
                                <!--[if (mso 16)]>
                                <style type="text/css">
                                a {text-decoration: none;}
                                </style>
                                <![endif]-->
                                <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                                <!--[if gte mso 9]>
                            <xml>
                                <o:OfficeDocumentSettings>
                                <o:AllowPNG></o:AllowPNG>
                                <o:PixelsPerInch>96</o:PixelsPerInch>
                                </o:OfficeDocumentSettings>
                            </xml>
                            <![endif]-->
                                <!--[if !mso]><!-- -->
                                <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet">
                                <!--<![endif]-->
                            </head>
                            
                            <body>
                                <div dir="ltr" class="es-wrapper-color">
                                    <!--[if gte mso 9]>
                                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                            <v:fill type="tile" color="#FF6E12"></v:fill>
                                        </v:background>
                                    <![endif]-->
                                    <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-email-paddings" valign="top">
                                                    <table class="es-content esd-footer-popover" cellspacing="0" cellpadding="0" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="esd-stripe" align="center">
                                                                    <table class="es-content-body" style="background-color: #ffffff;" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="esd-structure es-p40" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%" bgcolor="#fef852" style="background-color: #fef852; border-radius: 20px; border-collapse: separate;">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text es-p30t es-p10b es-p20r es-p20l">
                                                                                                                    <h1>Thank You<br>for Choosing Us</h1>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                            <tr>
                                                                                                                <td align="center" class="esd-block-text es-p30b">
                                                                                                                    <p style="font-size: 16px;">for your needs!</p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td class="esd-structure es-p40b es-p40r es-p40l" align="left">
                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td width="520" class="esd-container-frame" align="center" valign="top">
                                                                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="left" class="esd-block-text es-p5t es-p5b">
                                                                                                                    <h3>Dear ${user},</h3>
                                                                                                                    <p><br>Your Email is : ${req.body.email} </p><p><br>Your Password is : ${user_pass} </p>
                                                                                                                    <p>We just wanted to take a moment to thank you for choosing us for your   needs. We hope that you enjoyed   the service, and that we met your expectations.<br><br></p>
                                                                                                                    <p>If there's anything we can do to make your experience even better, please don't hesitate to let us know. We appreciate your feedback and are always looking for ways to improve.<br><br></p>
                                                                                                                    <p>Thank you again for your business. We look forward to serving you again soon!<br><br></p>
                                                                                                                    <p>Best regards,<br> Company</p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </body>
                            
                            </html>`, // html body
                          });
                
                    }

                    let reg = await admin.findById(req.user.id);
                    reg.userids.push(data.id);
                    await admin.findByIdAndUpdate(req.user.id,reg)
                    return res.status(200).json({msg:'Data Inserted Succ....',status:1,rec:data});
                }
                else{
                    return res.status(200).json({msg:'Data not Inserted Succ....',status:0});
                }
            }

            
        }
        else{
            console.log('password not Match');
            return res.status(200).json({msg:'Confirm Password not Match',status:0});
        }
   }
   catch(err){
        console.log('Somthing Wrong');
        return res.status(400).json({msg:'Somthing Wrong',status:0});
   }
   
}




module.exports.login = async (req, res) => {
    console.log(req.body)
    try {
        let check = await ragister.findOne({ email: req.body.email })


        if (check) {
            if (await bcrypt.compare(req.body.password, check.password)) {
                let token = await jwtdata.sign({ data: check }, 'batch_user', { expiresIn: '1h' })
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


module.exports.profile = async (req, res) => {

    try {
        let userdatas = await ragister.findById(req.user.id).populate('adminids').exec();
        if (userdatas) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: userdatas });
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



module.exports.viewalltask = async (req, res) => {

    try {
        let taskdata = await task.find({userids : req.user.id}).populate('adminid').exec();
       
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


module.exports.viewalltasks = async (req, res) => {

    try {
        let taskdata = await task.find({userids : req.user.id}).populate('adminid').exec();
        console.log(taskdata);
       
        if (taskdata) {
            return res.status(200).json({ msg: 'Data Found Succ....', status: 1, rec: taskdata });
        }
        else {
            return res.status(200).json({ msg: 'No Record found', status: 0 });
        }

    }
    catch (err) {
        console.log('Somthing Wrong 11');
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}


module.exports.activetask = async (req, res) => {

    try{
        if(req.params.id)
        {
            let taskdata = await task.findByIdAndUpdate(req.params.id,{status : "Active"});

            if(taskdata)
            {
                //console.log("Data is Active");
                return res.status(200).json({ msg: 'Task Activeted Succ....', status: 1, rec: taskdata });
            }
            else{
                //console.log("Data is Deactive");
                return res.status(200).json({ msg: 'No Record found', status: 0 });
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
           
        }
    }
    catch(err)
    {
      
        
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}

module.exports.Completetask = async (req, res) => {

    try{
        if(req.params.id)
        {
            let taskdata = await task.findByIdAndUpdate(req.params.id,{status : "Completed"});

            if(taskdata)
            {
                //console.log("Data is Active");
                return res.status(200).json({ msg: 'Task Completed Succ....', status: 1, rec: taskdata });
            }
            else{
                //console.log("Data is Deactive");
                return res.status(200).json({ msg: 'No Record found', status: 0 });
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
           
        }
    }
    catch(err)
    {
      
        
        return res.status(400).json({ msg: 'Somthing Wrong', status: 0 });
    }
}