const db = require('../models');
const {uploadProfile, uploadProject} = require('../utils/multer');
const mysql = require('mysql');

const express = require('express');
const http = require('http');
const app = express();

const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', function(req, res) {
    
});

router.post('/login', function(req, res) {
    
});

router.post('/register', function(req, res) {
    
});

router.delete('/me', function(req, res) {
    
});

router.patch('/me', function(req, res) {
    
});

router.get('/', function(req, res) {
    
});

module.exports = router;