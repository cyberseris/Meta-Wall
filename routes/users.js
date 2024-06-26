var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getUserController);
router.post('/', usersController.createUserController);

module.exports = router;
