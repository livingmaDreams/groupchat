const path = require('path');


exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');
const Message = require('../models/message');
const { Op } = require("sequelize");

exports.getAllUsers = async (req,res,next) =>{
  let msgId = req.body.msgCount;
  const data = await Message.findAll({
    where:{
      id:{
        [Op.gt]:msgId
      }
    }
  });
  if(data != ''){
    msgId = data[data.length-1].id;
    const msg=[];
    for(let i of data)
    {
      const obj={};
      const user = await User.findOne({where:{id:i.userId}});
      obj.name = user.name;
      obj.message= i.message;
      msg.push(obj);
    }
    res.status(200).json({message: msg,msgCount: msgId});
  }
  else{
    res.status(200).json({message: '',msgCount: msgId});
  }
    
};


exports.postMessage = (req,res,next) =>{
  
  const msg = req.body.msg;

  req.user
  .createMessage({message:msg})
  .then(data => res.status(200).json({status:'success',message: data.message,name: req.user.name}))
  .catch(err => res.status(500).json({status:'failure'}));
}

exports.logOut = (req,res,next) =>{

  req.user
  .update({active:'false'})
  .then(data => res.status(200).json({status:'Logout success'}))
  .catch(err => res.status(500).json({status:'Logout failure'}));
}