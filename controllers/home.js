const path = require('path');

exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');
const { Op } = require("sequelize");


exports.postMessage = async (req,res,next) =>{
  const grpName = req.body.grpName;
  const msg = req.body.msg;
  const id = req.user.id;

  try{
  const grp = await Group.findOne({where:{name:grpName}});
    await grp.createMessage({message:msg,userId:id});
   res.status(200).json({status:'success'})
  }
  catch(err){
    console.log(err);
    res.status(500).json({status:'failure'})};
}

exports.getGroups = (req,res,next) =>{
  const group =[];
  req.user
  .getGroups()
  .then(grp =>{
    for(let i of grp)
    group.push(i.name)
    res.status(200).json({groups:group})
  })
  .catch(err => console.log(err))
}

exports.getAllUsers = async (req,res,next) =>{
  const userList =[];
  try{
  const users = await User.findAll();
  for(let i of users)
  userList.push(i.name);
  res.status(200).json({users:userList});
  }
  catch(err){
    res.status(500).json({status:'failed'});
  }
}

exports.getGroupMsg = async(req,res,next) =>{
  const grpName = req.query.groupname;
  let msgCount = req.query.msgcount;

  const grpMsg=[];
  try{
  const grp = await Group.findOne({where:{name:grpName}})
    const msg = await grp.getMessages({where:{id:{[Op.gt]:msgCount}}});
   if(msg != ''){
   msgCount = msg[msg.length-1].id;
   for(let i of msg){
    const obj={};
    const user = await User.findOne({where:{id:i.userId}});
    obj.name = user.name;
    obj.message = i.message;
     grpMsg.push(obj);
   }
   res.status(200).json({Msg:grpMsg,msgCount:msgCount})
  }
  else
  res.status(200).json({message: '',msgCount:msgCount});

  }
  catch(err){
    console.log(err)
    res.status(500).json({status:'failed',msgCount:msgCount});
  }
}

const Group = require('../models/group');

exports.createGroup = async (req,res,next) =>{
 const grpName = req.body.grpName;
 const id = req.user.id;
 const usr = req.body.user;
try{
const grp = await req.user.createGroup({name:grpName,createdby:id},{through:{admin:'true',message:'joined'}});

for(let i of usr){
  const usr = await User.findOne({where:{name:i}})
   await grp.addUser(usr,{through:{admin:'false'}})
}  
res.status(200).json({status:'Grp has been created'})
}
catch(err){
   res.status(500).json({status:'Failed'});
 }
}

exports.logOut = (req,res,next) =>{

  req.user
  .update({active:'false'})
  .then(data => res.status(200).json({status:'Logout success'}))
  .catch(err => res.status(500).json({status:'Logout failure'}));
}