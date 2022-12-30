const path = require('path');


exports.getHomePage = (req,res,next) => {
  res.status(200).sendFile(path.join(__dirname,'../views/home.html'));
};

const User = require('../models/user');

exports.getAllUsers = async (req,res,next) =>{
    const user=[];
    const obj = {};
  const userList = await User.findAll({where:{active:'true'}});
  console.log(userList)
  for(let list of userList)
   {
    const msg = await list.getMessages();
    console.log(msg)
    obj[list.name] = msg;
    user.push(obj);
   }

  res.send(200).json({users: userList});
};

exports.postMessage = (req,res,next) =>{
  
  const msg = req.body.msg;

  req.user
  .createMessage({message:msg})
  .then(data => res.status(200).json({status:'success',message: data.message}))
  .catch(err => res.status(500).json({status:'failure'}));
}