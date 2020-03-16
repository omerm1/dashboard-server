const express = require("express");
const router = express.Router();
const axios = require('axios');

const key = 'd0a10211ea3d36b0a6423a104782130e'
let result = '';

async function getWeather(lat, lng) {
  let reqString = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
  try {
    const response = await axios.get(reqString);
    result = response.data
    console.log('weather', result);
  } catch (error) {
    console.error(error);
  }
}

/**
 * @method - GET
 * @param - /
 * @description - Fetch location-specific weather
 */

router.get(
  "/",
  async (req, res) => {
    getWeather(req.query.lat, req.query.lng)
    res.send(result)
  }
)

module.exports = router;