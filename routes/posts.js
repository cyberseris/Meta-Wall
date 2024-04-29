var express = require('express');
var router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.searchController);

router.post('/', postsController.postController);

module.exports = router;
