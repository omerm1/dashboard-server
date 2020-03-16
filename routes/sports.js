const express = require("express");
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

const results = [];
const filteredResults = []

// This array will contain objects of which the key will be the winning team, and the value as the losing team
const finalResults = []

let teams = {
  Juventus: [],
  Napoli: [],
  Roma: [],
  Milan: [],
  Inter: [],
  Sampdoria: [],
  Chievo: [],
  Bologna: [],
  Lazio: [],
  Spal: [],
  Torino: [],
  Atalanta: [],
  Cagliari: [],
  Udinese: [],
  Fiorentina: [],
  Sassuolo: [],
  Crotone: [],
  Genoa: [],
  Verona: [],
  Benevento: []
}

let filename = __dirname + '../assets/sports.csv'


const parseSportsData = () => {
  fs.createReadStream('sports.csv')
      .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
    });

    // Parse results to only show important details
    for (const idx in results) {
      const obj = results[idx]
        const z = {}
        z.home = obj['HomeTeam']
        z.away = obj['AwayTeam']
        z.win = obj['FTR']

        filteredResults.push(z)
    }

    // Parse filtered results to show desired data
    for (const idx in filteredResults) {
      const obj = filteredResults[idx]
      const homeTeam = obj['home']
      const awayTeam = obj['away']
      if (obj['win'] === 'H') {
        const z = {}
        z[homeTeam] = awayTeam
        finalResults.push(z)
      }
      if (obj['win'] === 'A') {
        const z = {}
        z[awayTeam] = homeTeam
        finalResults.push(z)
      }
    }

  finalResults.forEach(x => {
    for (let [key, value] of Object.entries(x)) {
      switch (key) {
        case ('Juventus'):
          teams.Juventus.push(value)
          break;
        case ('Napoli'):
          teams.Napoli.push(value)
          break;
        case ('Roma'):
          teams.Roma.push(value)
          break;
        case ('Milan'):
          teams.Milan.push(value)
          break;
        case ('Inter'):
          teams.Inter.push(value)
          break;
        case ('Sampdoria'):
          teams.Sampdoria.push(value)
          break;
        case ('Chievo'):
          teams.Chievo.push(value)
          break;
        case ('Bologna'):
          teams.Bologna.push(value)
          break;
        case ('Lazio'):
          teams.Lazio.push(value)
          break;
        case ('Spal'):
          teams.Spal.push(value)
          break;
        case ('Torino'):
          teams.Torino.push(value)
          break;
        case ('Atalanta'):
          teams.Atalanta.push(value)
          break;
        case ('Cagliari'):
          teams.Cagliari.push(value)
          break;
        case ('Udinese'):
          teams.Udinese.push(value)
          break;
        case ('Fiorentina'):
          teams.Fiorentina.push(value)
          break;
        case ('Sassuolo'):
          teams.Sassuolo.push(value)
          break;
        case ('Crotone'):
          teams.Crotone.push(value)
          break;
        case ('Genoa'):
          teams.Genoa.push(value)
          break;
        case ('Verona'):
          teams.Verona.push(value)
          break;
        case ('Benevento'):
          teams.Benevento.push(value)
          break;
      }
    }
  })
}

/**
 * @method - GET
 * @param - /
 * @description - Fetch latest news
 */

router.get(
  "/",
  async (req, res) => {
    parseSportsData()

    res.send(teams)
  }
)

module.exports = router;