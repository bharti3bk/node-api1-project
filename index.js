// implement your API here 
//  
require('dotenv').config(); 
const port = process.env.PORT; 
console.log(port)

const express = require('express') 
const db = require('./data/db.js')
const bodyParser = require('body-parser')
const server = express();
server.use(bodyParser.json()); 

server.get('/', (req, res) => {
    res.send('Hello from Express .....');
})  


server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
}) 

server.get('/api/users', (req, res) => {
    const users = db.find()
    users.then(data => {
        res.json(data);
    }).catch(error => {
        res.send(error)
    })
})

server.get("/api/users/:id", (req, res) => {
    const userid = req.params.id;
    db.findById(userid)
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.send(err)
        })
})

server.post("/api/users", (req, res) => {
    const userData = req.body;
    const response = db.insert(userData)
    response.then(result => {
        res.json(result);
    })
     .catch(error => {
        res.send(error);
    })
})

server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const deleteUser = db.remove(id)
    deleteUser.then(response => {
        res.json(response);
    })
        .catch(error => {
            res.json(error)
        })
})


