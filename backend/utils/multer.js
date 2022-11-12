const multer = require("multer");
const path = require("path");
const fs = require('fs');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
require('dotenv').config();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
        cb(null, true);
    }
    else{
        req.fileValidationError = "이미지 파일 확장자 확인 부탁드립니다(허용 확장자: jpg, jpeg, png, gif)";
        cb(null, false);
    }
};

const uploadProfile = multer({
    storage: multerS3({
        s3: s3,
        bucket: '2022fall-42class-team12',
        acl: 'public-read-write',
        key: function(req, file, cb){
            cb(null, 'profiles/' + Date.now() + file.originalname);
        }
    }),
    fileFilter: fileFilter,
    limits: {fileSize: 30*1024*1024},
});

const uploadProject = multer({
    storage: multerS3({
        s3: s3,
        bucket: '2022fall-42class-team12',
        acl: 'public-read-write',
        key: function(req, file, cb){
            cb(null, 'projects/' + Date.now() + file.originalname);
        }
    }),
    fileFilter: fileFilter,
    limits: {fileSize: 30*1024*1024},
});

module.exports = {uploadProfile, uploadProject};