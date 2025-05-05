const http = require('node:http')
const express = require('express')
const app = express()
const fileManager = require('./file-manager')
/*
HTTP methods

GET: retrieve data,
POST: send data,
DELETE: remove data,
PUT/PATCH: update data

*/

const hostname = '127.0.0.1' //local host
const port = 3001 //port
let movies = [
    {
        title:"Nickel Boys",
        initial_release: new Date("2024-8-30").toDateString(),
        director:"RaMell Ross",
        length: "1h 30m",
        genres: [
            "Drama", 
            "Historical drama"
        ],
    },
    {
        title:"G20",
        initial_release: new Date("2025-4-10").toDateString(),
        director:"Patricia Riggen",
        length: "1h 48m",
        genres: [
            "Action", 
            "Thriller"
        ],
    },
    {
        title:"The Gorge",
        initial_release: new Date("2025-2-14").toDateString(),
        director:"Scott Derrickson",
        length: "2h 7m",
        genres: [
            "Action", 
            "Sci-fi"
        ],
    }
]
let series = [
    {
        title:"Dope Thief",
        genres: [
            "Drama", 
            "crime fiction"
        ],
        first_ep_release: new Date("2025-3-14").toDateString(),
        network: "Apple TV+",
        seasons: 1,
        language: "English"
    },
    {
        title:"Snowfall",
        genres: [
            "Serial", 
            "Crime", 
            "Drama", 
            "Mystery", 
            "Detective fiction", 
            "crime fiction", 
            "Police procedural"
        ],
        first_ep_release: new Date("2017-7-5").toDateString(),
        network: "Disney+",
        seasons: 6,
        language: "English"
    },
    {
        title:"Queen of the South",
        genres: [
            "Action", 
            "Soap opera", 
            "Drama", 
            "Suspense", 
            "Thriller", 
            "Mystery", 
            "Detective fiction", 
            "Police procedural"
        ],
        first_ep_release: new Date("2016-6-16").toDateString(),
        network: "Netflix",
        seasons:5,
        language: "English"
    }
]
let songs = [
    {
        title: "Confession",
        artists: ["Sjava"],
        album: "Umqhele",
        genres: "Hip Hop",
        released: new Date("2018-1-1").getFullYear()
    },
    {
        title: "Isoka",
        artists: [
            "Mzukulu",
            "Sjava", 
            "Q Twins"
        ],
        album: "Isibuko",
        genres: [
            "Nigerian", 
            "R&B", 
            "Afropop"
        ],
        released: new Date("2013-1-1").getFullYear()
    }
]



//movies
app.get('/movies', (req, res) =>{
    res.setHeader('content-type', 'application/json')
    fileManager.createFile()
    fileManager.displayData("movies").then((movies) => {
        res.end(JSON.stringify(movies))
    }).catch(err => {
        res.end(JSON.stringify({ "error": err }));
    })
    
})

//series
app.get('/series', (req, res) =>{
    res.statusCode = 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({series: series}))
})

//songs
app.get('/songs', (req, res) =>{
    res.statusCode = 200
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({songs: songs}))
})

app.get('.', (req, res) => {
    res.send("<h1>PAge Not Found.</h1>")
})
app.listen(3000, ()=>{
    console.log("express")
})