const express = require('express');
const initController = require('../controllers/initController');

const router = express.Router();

router.get('/hello', initController.hello);

module.exports = router;
