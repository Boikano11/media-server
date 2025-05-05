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
            if (err) return reject(err)
            try {
                const parsed = JSON.parse(data)
                resolve(parsed[mediaDisp] || [])
            } catch (e) {
                reject(e)
            }
        })
    })
}

exports.insertData = (category) =>{
    if(fs.existsSync(FILE_NAME)){
        return new Promise((resolve, reject) => {
            fs.readFile(FILE_NAME, 'UTF-8', (err, data) => {
                if (err) throw err
                
                try{
                    const modelCategory = category
                    const parsedData = JSON.parse(data)
        
                    if (modelCategory === "movies"){
                        const movieData = parsedData.movies
                        
                        const movieModel = {
                            "id": movieData.length,
                            "title": "Fast & Furious 5",
                            "directors": ["Mr 1", "Mr 2", "Mr 4"],
                            "release": 2006
                        }
        
                        movieData.push(movieModel)
                        fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err) => {
                            if (err) throw err
                            console.log("movie added")
                        })
                        console.log(parsedData)
                        resolve(movieData)
                    }else if(modelCategory === "series"){
                        const seriesData = parsedData.series
        
                        const seriesModel = {
                            "id": seriesData.length,
                            "title": "House",
                            "directors": [
                                "Me 1",
                                "You 2",
                                "US 5"
                            ],
                            "seasons": 6,
                            "initialRelease": 2005
                        }
                        seriesData.push(seriesModel)
                        fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err) => {
                            if (err) throw err
                            console.log("series added")
                        })
                        console.log(parsedData)
                        resolve(seriesData)
                    }else if (modelCategory === "songs"){
                        const songData = parsedData.songs
                        console.log('songs = ', songData)
        
                        const songsModel = {
                            "id": songData.length,
                            "title": "Nkadimeng Dieta",
                            "artist": "JustSam",
                            "album": "Valliano",
                            "release": 2025
                        }
        
                        songData.push(songsModel)
                        fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err) => {
                            if (err) throw err
                            console.log("song added")
                        })
                        console.log(parsedData)
                        resolve(songData)
                    }
                }catch(e){
                    reject(e)
                }
                
            })
        })        
    }else{
        console.log(false)
    }
}

exports.deleteData = (category) => {
    if(fs.existsSync(FILE_NAME)){
        return new Promise((resolve, reject) => {
            fs.readFile(FILE_NAME, 'utf-8', (err, data) => {
                if (err) throw err
                
                try{
                    const parsedData = JSON.parse(data)
                    if(category === "movies"){
                       const movie = parsedData.movies
                       const movieID = 1
                       const result = movie.filter(item =>{
                           return item.id !== movieID
                       })
                       parsedData.movies = result

                       fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err)=>{
                            if(err) throw err
                            console.log("data deleted.")
                       })
                       resolve(result) 
                    }else if(category === "series"){
                        const series = parsedData.series
                        const seriesID = 1
                        const result = series.filter(item =>{
                            return item.id !== seriesID
                        })
                        parsedData.series = result
 
                        fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err)=>{
                             if(err) throw err
                             console.log("data deleted.")
                        })
                        resolve(result) 
                     }else if(category === "songs"){
                        const song = parsedData.songs
                        const songID = 1
                        const result = song.filter(item =>{
                            return item.id !== songID
                        })
                        parsedData.songs = result
 
                        fs.writeFile(FILE_NAME, JSON.stringify(parsedData, null, 2), (err)=>{
                             if(err) throw err
                             console.log("data deleted.")
                        })
                        resolve(result)  
                     }
                    
                }catch(e){
                    reject(e)
                }
            })
        })
    }
}

exports.updateData = (category) => {
    if(fs.existsSync(FILE_NAME)){
        return new Promise((resolve, reject) => {
            fs.readFile(FILE_NAME, 'utf-8', (err, data) => {
                if (err) throw err
                
                if (category === "movies"){
                    try{
                        const parsedData = JSON.parse(data)
                        const movies = parsedData.movies
                        const movieId = 0
                        const updateMovie = movies.filter((item) => item.id === movieId)
                        updateMovie[movieId].title = "hello"
                        resolve(updateMovie)
                    }catch(err){
                        reject(err)
                    }
                }else if(category === "series"){
                    try{
                        const parsedData = JSON.parse(data)
                        const series = parsedData.series
                        const seriesId = 0
                        const updateSeries = series.filter((item) => item.id === seriesId)
                        updateSeries[seriesId].directors[0] = 'company'
                        resolve(updateSeries)
                    }catch(err){
                        reject(err)
                    }
                }else if(category === "songs"){
                    try{
                        const parsedData = JSON.parse(data)
                        const songs = parsedData.songs
                        const songId = 0
                        const updateSong = songs.filter((item) => item.id === songId)
                        updateSong[songId].title = "hello"
                        resolve(updateSong)
                    }catch(err){
                        reject(err)
                    }
                }
            })
        })
    }
}
