const http = require('node:http')

/*
HTTP methods

GET: retrieve data,
POST: send data,
DELETE: remove data,
PUT/PATCH: update data

*/

const hostname = '127.0.0.1' //local host
const port = 3001 //port
let movies = ['Saw', 'Fast & Furious', 'Beauty And The Beast']
let series = ['Game Of Thrones', 'Big Bang Theory']
let songs = ['I love you', 'Forever More', 'One more time']

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/movies'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({movies: movies}))
    }else if (req.method === 'GET' && req.url === '/series'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({series: series}))
    }else if (req.method === 'GET' && req.url === '/songs'){
        res.statusCode = 200
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify({songs: songs}))
    }else{
        res.statusCode = 404
        res.setHeader('content-type', 'application/json')
        res.end()
    }
    
})

server.listen(port, hostname, ()=>{
    console.log('server running')
})