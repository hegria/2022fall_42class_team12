const db = require('../models');
const {uploadProfile, uploadProject} = require('../utils/multer');
const mysql = require('mysql');

const express = require('express');
const http = require('http');
const app = express();

const router = express.Router();
const fs = require('fs');
const path = require('path');



module.exports = router;