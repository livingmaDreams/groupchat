const path = require('path');


exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');

exports.getAllUsers = async (req,res,next) =>{

  const userList = await User.findAll({where:{active:'true'}});
  res.send(200).json({userList: userList});
};