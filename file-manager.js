const fs = require('node:fs')
const express = require('express')
const app = express()

const FILE_NAME = 'database.json'
exports.createFile = () => {
    fs.open(FILE_NAME, 'wx', (err, data) => {
        if (err) throw err
        let dataDB = {
            "movies": [
              {
                "id": 0,
                "title": "Titanic",
                "directors":["him", "her", "them"],
                "release": 1998
              }
            ],
            "series": [
              {
                "id" : 0,
                "title": "Baki",
                "directors": ["Me", "You", "US"],
                "seasons": 3,
                "initialRelease": 2015
              }
            ],
            "songs": [
              {
                "id": 0,
                "title": "Nkadimeng Milano",
                "artist": "JustSam",
                "album": "Milano",
                "release": 2021
              }
            ]
          }
        
        fs.writeFile(data, JSON.stringify(dataDB, null, 2), err => {
            if (err) throw err
            console.log('file created')
        })
    })
    
}


exports.displayData = (mediaDisp) => {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_NAME, 'utf8', (err, data) => {
            if (err) return reject(err);
            try {
                const parsed = JSON.parse(data);
                resolve(parsed[mediaDisp] || []);
            } catch (e) {
                reject(e);
            }
        });
    });
};
