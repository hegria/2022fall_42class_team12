const db = require('../models');
const {uploadProfile, uploadProject} = require('../utils/multer');
const mysql = require('mysql');

const express = require('express');
const http = require('http');
const app = express();

const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/random', function(req, res) {
    
});

router.get('/', function(req, res) {
    
});

router.post('/:id/favorite', function(req, res) {
    
});

router.delete('/:id/favorite', function(req, res) {
    
});

router.get('/:id', function(req, res) {
    
});

router.delete('/:id', function(req, res) {
    
});

router.patch('/:id', function(req, res) {
    
});

router.post('/:id', function(req, res) {
    
});

module.exports = router;