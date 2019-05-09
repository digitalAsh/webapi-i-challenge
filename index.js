// implement your API here
const express = require('express');

// express = lightweight
// routers -> organizing our endpoints
// middleware -> allows us to expand and customize

const db = require('./data/db.js');

const server = express();

//middleware
server.use(express.json());

// creating endpoints
// I want to make something available in case anyone needs
// server.get('/', (req, res) => {
//     console.log('inside the get request')
//     res.send('<h2>Hello World</h2>');
// });

// server.get('/now', (req, res) => {
//     const now = new Date().toISOString();
//     res.send(now);
// });

// Read - send back a list of all hubs
server.get('/users', (req, res) => {
    //get the hubs from the db
    //then send them back
    db.find()
    .then(allUsers => {
        res.json(allUsers);
    }).catch(err => {
        res.status(500).send(err);
    });
});

server.get('/users/:id', (req, res) => {
    db.findById()
    .then(userById => {
        res.json(userById);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

// Create - add a new user to the list
server.post('/users', (req, res) => {
    const newUser = req.body;

    db.insert(newUser)
    .then(addedUser => {
        res.status(201).json(addedUser)
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

// Destroy - remove a user 
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removeUser => {
        res.json(removeUser);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

// Update - alter a user
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;

    db.update(id, user)
    .then(updatedUser => {
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.status(404).json({ err: 'The user information could not be modified'});
        }
    })
    .catch(err => {
        res.status(500).send(err);
    });
})

// listening
server.listen(9090, () => {
    console.log('Listening on port 9090');
});
