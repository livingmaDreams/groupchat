const path = require('path');


exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');

exports.getAllUsers = async (req,res,next) =>{
  const userList = await User.findAll({where:{active:'true'}});
  const activeUser = await activeUsers(userList);
  const allUser = await User.findAll();
  const msg = await getMessageFromUsers(allUser);
  res.status(200).json({users: activeUser,message: msg});
};

async function getMessageFromUsers(users){
  const user={};
  for(let list of users)
  {
   const obj = [];
   const msg = await list.getMessages();
   for(let i of msg)
   obj.push(i.message);
   user[list.name] = obj;
  }
  return user;
}

async function activeUsers(userList){
 const users = [];
 for(let list of userList)
 users.push(list.name);
 return users;
}

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