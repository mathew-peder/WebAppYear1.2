'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const bookmarkStore = {

  store: new JsonStore('./models/bookmark-store.json', { bookmarkCollection: [] }),
  collection: 'bookmarkCollection',

  getAllBookmark() {
    return this.store.findAll(this.collection);
  },

  getBookmark(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBookmark(bookmark) {
    this.store.add(this.collection, bookmark);
  },

  removeBookmark(id) {
    const bookmark = this.getBookmark(id);
    this.store.remove(this.collection, bookmark);
  },

  removeAllBookmark() {
    this.store.removeAll(this.collection);
  },

   addSite(id, site) {
    const bookmark = this.getBookmark(id);
    bookmark.site.push(site);
  },

  removeSite(id, siteId) {
    const bookmark = this.getBookmark(id);
    const site = bookmark.site;
    _.remove(site, { id: siteId});
  },
};

module.exports = bookmarkStore;
