'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');


const bookmark = {
  index(request, response) {
    const bookmarkId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug('Bookmark id = ', bookmarkId);
    const viewData = {
      title: 'Bookmark',
      user: loggedInUser,
      bookmark: bookmarkStore.getAllBookmark( bookmarkId),
    };
    response.render('bookmark', viewData);
  },

  deleteBookmark(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const bookmarkId = request.params.id;
    logger.debug(`Deleting Bookmark ${bookmarkId}`);
    bookmarkStore.removeBookmark(bookmarkId);
    response.redirect('/bookmark');
  },

  addBookmark(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newBookmark = {
      id: uuid(),
      title: request.body.title,
      site: [],
    };
    logger.debug('Creating a new Bookmark', newBookmark);
    bookmarkStore.addBookmark(newBookmark);
    response.redirect('/bookmark');
  },
  

};

module.exports = bookmark;