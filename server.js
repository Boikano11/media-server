const http = require('node:http')
const fs = require('node:fs')
const express = require('express')
const app = express()


const hostname = '127.0.0.1' //local host
const port = 3001 //port
let movies = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/movies'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        //create file
        fs.open('moviesDB.json', 'wx', (err, data) => {
            if (err) throw err
            fs.writeFile(data, JSON.stringify(movies), err => {
                if (err) throw err
                res.end(JSON.stringify(movies))
            })
        })
        
    }else if (req.method === 'GET' && req.url === '/series'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        fs.open('seriesDB.json', 'wx', (err, data) => {
            if (err) throw err
            fs.writeFile(data, JSON.stringify(series), err => {
                if (err) throw err
                res.end(JSON.stringify(series))
            })
        })
    }else if (req.method === 'GET' && req.url === '/songs'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        fs.open('songsDB.json', 'wx', (err, data) => {
            if (err) throw err
            fs.writeFile(data, JSON.stringify(songs), err => {
                if (err) throw err
                res.end(JSON.stringify(songs))
            })
        })
    }else{
        res.statusCode = 404
        res.setHeader('content-type', 'application/json')
        res.end()
    }
})

server.listen(port, hostname, ()=>{
    console.log('server running')
})

