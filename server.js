const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const comediansRoutes = require('./routes/comedians')
server.use('/comedians', comediansRoutes)

const { init } = require('./db')

const port = process.env.PORT || 3000;

// Root route
server.get('/', (req, res) => res.send('Hello, COMEDY!'))


init().then(() => {
    server.listen(port, () => console.log(`Express now departing from http://localhost:${port}!`))
})