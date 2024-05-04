var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getPostController);
router.post('/', postsController.createPostController);

module.exports = router;
