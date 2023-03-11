const express = require('express');
const { uploadImg } = require('../controllers/uploadFile');
const { authMiddleware } = require('../middleware/checksOfAuth');

const router = express.Router();

router.post('/', authMiddleware, uploadImg)

module.exports = router