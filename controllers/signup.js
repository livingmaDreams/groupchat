const path = require('path');

exports.getSignUpPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../views/signup.html'));
}