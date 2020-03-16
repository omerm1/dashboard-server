const express = require("express");
const router = express.Router();
const axios = require('axios');

const reqString = 'https://therapy-box.co.uk/hackathon/clothing-api.php?username=swapnil'
let result = ''

let clothes = { blazer: 0, hoodie: 0, jacket: 0, jumper: 0, raincoat: 0, sweater: 0 }

async function getClothesData() {
  try {
    const response = await axios.get(reqString);
    result = response.data
    console.log(`res is ${result}`)
  } catch (error) {
    console.error(`error is ${error}`);
  }
}

const parseClothesData = () => {
  result.payload.forEach(x => {
    switch (x.clothe) {
      case ('blazer'):
        clothes.blazer ++
        break;
      case ('hoodie'):
        clothes.hoodie ++
        break;
      case ('jacket'):
        clothes.jacket ++
        break;
      case ('jumper'):
        clothes.jumper ++
        break;
      case ('raincoat'):
        clothes.raincoat ++
        break;
      case ('sweater'):
        clothes.sweater ++
        break;
    }
  })
}

/**
 * @method - GET
 * @param - /
 * @description - Fetch clothing data
 */

router.get(
  "/",
  async (req, res) => {
    getClothesData()
    parseClothesData()
    res.send(clothes)
  }
)

module.exports = router;