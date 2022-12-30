const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
const authenticate = require('../middleware/authenticate');

router.get('/',homeController.getHomePage);
router.get('/users',homeController.getAllUsers);
router.post('/users',authenticate.authenticate,homeController.postMessage);

module.exports= router;