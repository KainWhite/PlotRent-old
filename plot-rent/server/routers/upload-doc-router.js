const docUploader = require('../utility/doc-uploader');
const express = require('express');
const bodyparser = require('body-parser');

const uploadImageRouter = express.Router();

uploadImageRouter.use(bodyparser.json());

//! base route '/upload-doc'

uploadImageRouter.post('/', docUploader, (req, res) => {
  res.json({fileUrl: "http://localhost:3000/docs/" + req.file.originalname});
});

module.exports = uploadImageRouter;
