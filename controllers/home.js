const path = require('path');


exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');

exports.getAllUsers = async (req,res,next) =>{
    const user=[];
    const obj = {};
  const userList = await User.findAll({where:{active:'true'}});
  for(let list of userList)
   {
    const msg = await list.getMessages();
    obj[list.name] = msg;
    user.push(obj);
   }

  res.send(200).json({users: userList});
};