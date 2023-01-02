const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
const authenticate = require('../middleware/authenticate');

router.get('/',homeController.getHomePage);
router.get('/allusers',homeController.getAllUsers);
router.post('/creategroup',authenticate.authenticate,homeController.createGroup);
router.get('/usergrps',authenticate.authenticate,homeController.getGroups);
router.get('/grpmsg',authenticate.authenticate,homeController.getGroupMsg);
// router.get('/users',homeController.getAllUsersMsg);
router.post('/users',authenticate.authenticate,homeController.postMessage);
router.get('/logout',authenticate.authenticate,homeController.logOut);

module.exports= router;