'use strict';

const logger = require('../utils/logger');
const bookmarkStore = require('../models/bookmark-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');


const resource = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const bookmarkId = request.params.id;
    logger.debug('Bookmark id = ', bookmarkId);
    const viewData = {
      title: 'Bookmark',
      bookmark: bookmarkStore.getBookmark(bookmarkId),
    };
    response.render('bookmark', viewData);
  },
  
deleteSite(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const bookmarkId = request.params.id;
    const siteId = request.params.siteid;
    logger.debug(`Deleting Site ${siteId} from Bookmark ${bookmarkId}`);
    bookmarkStore.removeSite(bookmarkId, siteId);
    response.redirect('/resource/' + bookmarkId);
  },

  addSite(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const bookmarkId = request.params.id;
    const bookmark = bookmarkStore.getBookmark(bookmarkId);
    const newSite = {
      id: uuid(),
      title: request.body.title,
      //link: request.body.link,
      link: request.body.site,
    };
    bookmarkStore.addSite(bookmarkId, newSite);
    bookmark.redirect('/resource/' + bookmarkId);
  }
}
module.exports = resource;