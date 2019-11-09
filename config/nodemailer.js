const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
  service: 'gmail',
  host :'smtp.gmail.com',
  port:587,
  secure :false,
  auth :{
    user: 'ag4919411@gmail.com',
    pass: 'izlqrgcejtxlbqyr'
  }
});

let renderTemplate=(data,relativePath)=>{
let mailHTML;
ejs.renderFile(
  path.join(__dirname,'../views/mailers',relativePath),
  data,
  function(err,template){
    if(err){
      console.log(err,"error in rendering emails");
      return;
    }
    mailHTML=template;
  }
);
return mailHTML;
}
module.exports={
  transporter:transporter,
  renderTemplate:renderTemplate
}