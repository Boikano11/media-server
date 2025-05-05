const http = require('node:http')
const fs = require('node:fs')
const express = require('express')
const app = express()
const fileManager = require('./file-manager')
const { log } = require('node:console')


const hostname = '127.0.0.1' //local host
const port = 3001 //port
const FILE_NAME = 'database.json'

const server = http.createServer((req, res) => {
    if(req.method === 'GET'){
        if(req.url === '/movies'){
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            //create file
            if(fs.existsSync(FILE_NAME)){
                fileManager.displayData("movies").then((movies) => {
                    res.end(JSON.stringify(movies));
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Failed to read data' }));
                });
                }else{
                    fileManager.createFile()
                    fileManager.displayData("movies").then((movies) => {
                        res.end(JSON.stringify(movies));
                    })
                    .catch((err) => {
                        res.statusCode = 500;
                        res.end(JSON.stringify({ error: 'Failed to read data' }));
                    });
                }            
        }else if(req.url === '/series'){
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            if(fs.existsSync(FILE_NAME)){
                fileManager.displayData("series").then((series) => {
                    res.end(JSON.stringify(series));
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Failed to read data' }));
                });
            }else{
                fileManager.createFile()
                fileManager.displayData("series")
                res.end()
            }
        }else if(req.url === '/songs'){
            if(fs.existsSync(FILE_NAME)){
                fileManager.displayData("songs").then((songs) => {
                    res.end(JSON.stringify(songs));
                })
                .catch((err) => {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'Failed to read data' }));
                });
            }else{
                fileManager.createFile()
                fileManager.displayData("songs")
                res.end()
            }
        }else{
            res.statusCode = 404
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "No such directory."}))
        }
    }else if(req.method === 'POST'){
        if(req.url === '/movies'){
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            fileManager.insertData("movies").then((movies) =>{
                res.end(JSON.stringify(movies))
            }).catch((err) => {
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else if(req.url === '/series'){
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            fileManager.insertData("series").then((series) =>{
                res.end(JSON.stringify(series))
            }).catch((err) => {
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else if(req.url === '/songs'){
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            fileManager.insertData("songs").then((songs) =>{
                res.end(JSON.stringify(songs))
            }).catch((err) => {
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else{
            res.statusCode = 404
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "No such directory."}))
        }
    }else if(req.method === 'DELETE'){
        if(req.url === '/movies'){
            fileManager.deleteData("movies").then((movie) => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(movie))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else if(req.url === '/series'){
            fileManager.deleteData("series").then((serie) => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(serie))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else if(req.url === '/songs'){
            fileManager.deleteData("songs").then((song) => {
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(song))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"erorr": err}))
            })
        }else{
            res.statusCode = 404
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "No such directory."}))
        }
    }else if(req.method === 'PUT'){
        if(req.url === '/movies'){            
            fileManager.updateData("movies").then((movie) =>{
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(movie))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"error": err}))
            })
        }else if(req.url === '/series'){
            fileManager.updateData("series").then((series) =>{
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(series))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"error": err}))
            })
        }else if(req.url === '/songs'){
            fileManager.updateData("songs").then((song) =>{
                res.statusCode = 200
                res.setHeader('content-type', 'application/json')
                res.end(JSON.stringify(song))
            }).catch((err) =>{
                res.statusCode = 500
                res.end(JSON.stringify({"error": err}))
            })
        }else{
            res.statusCode = 404
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({"error": "No such directory."}))
        }
    }
})



server.listen(port, hostname, ()=>{
    console.log('server running')
})

