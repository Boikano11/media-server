const http = require('node:http')
const fs = require('node:fs')
const express = require('express')
const app = express()
const fileManager = require('./file-manager')

const FILE_NAME = 'database.json'
//movies
app.get('/movies', (req, res) =>{
    
    if(fs.existsSync(FILE_NAME)){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        fileManager.displayData("movies").then((movies) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(movies))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }else{
        fileManager.createFile()
        fileManager.displayData("movies").then((movies) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(movies))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }
})

//series
app.get('/series', (req, res) =>{
    if(fs.existsSync(FILE_NAME)){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        fileManager.displayData("series").then((series) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(series))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }else{
        fileManager.createFile()
        fileManager.displayData("series").then((series) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(series))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }
})

//songs
app.get('/songs', (req, res) =>{
    if(fs.existsSync(FILE_NAME)){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        fileManager.displayData("songs").then((songs) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(songs))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }else{
        fileManager.createFile()
        fileManager.displayData("songs").then((songs) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(songs))
        }).catch(err => {
            res.statusCode = 500
            res.end(JSON.stringify({ "error": err }));
        })
    }
})

//POST
app.post('/movies', (req, res) => {
    if(fs.existsSync(FILE_NAME)){
        fileManager.insertData("movies").then((movie) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(movie))
        }).catch(err => {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "file not found"}))
        })
    }
})

app.post('/series', (req, res) => {
    if(fs.existsSync(FILE_NAME)){
        fileManager.insertData("series").then((series) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(series))
        }).catch(err => {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "file not found"}))
        })
    }
})

app.post('/songs', (req, res) => {
    if(fs.existsSync(FILE_NAME)){
        fileManager.insertData("songs").then((songs) => {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify(songs))
        }).catch(err => {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "file not found"}))
        })
    }
})

//Unmatched routes
app.use((req, res) => {
    res.statusCode = 404
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify({"Error": "Directory not found."}))
})

app.listen(3000, ()=>{
    console.log("express")
})