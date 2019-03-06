'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const accounts = require('./controllers/accounts.js');
const bookmark = require('./controllers/bookmark.js');
const resource = require('./controllers/resource.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/bookmark', bookmark.index);

router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);


router.get('/dashboard', dashboard.index);
router.get('/bookmark/deletebookmark/:id', bookmark.deleteBookmark);
router.post('/bookmark/addbookmark', bookmark.addBookmark);

router.get('/site/:id', bookmark.index);
router.post('/resource/:id/addsite', resource.addSite);
router.get('/resource/:id/deletesite/:siteid', resource.deleteSite);

module.exports = router;
