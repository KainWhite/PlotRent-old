const imageUploader = require('../utility/image-uploader');
const express = require('express');
const bodyparser = require('body-parser');

const uploadImageRouter = express.Router();

uploadImageRouter.use(bodyparser.json());

//! base route '/upload-image'

uploadImageRouter.post('/', imageUploader, (req, res) => {
  res.json({fileUrl: "http://localhost:3000/images/" + req.file.originalname});
});

module.exports = uploadImageRouter;
