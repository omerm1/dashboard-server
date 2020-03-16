const express = require("express");
const router = express.Router();
let Parser = require('rss-parser');
let parser = new Parser();


/**
 * @method - GET
 * @param - /
 * @description - Fetch latest news
 */

router.get(
  "/",
  async (req, res) => {
    let feed = await parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml');
    // Send latest news item upon request
    res.send(feed.items[0])
  }
)

module.exports = router;