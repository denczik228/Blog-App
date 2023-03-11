const asyncHandler = require('express-async-handler');
const multer = require('multer');

const uploadImg = asyncHandler(async (req, res) => {
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

module.exports={uploadImg}