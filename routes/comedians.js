const express = require('express');
const { index, show, create, update, destroy } = require('../db');

const router = express.Router();

// index route
router.get('/', (req, res) => {
    index()
        .then(result => {
            const comedians = result.map(d => ({ id: d._id, name: d.name, age: d.age, status: d.status }))
            res.json({comedians})
        })
        .catch(err => res.status(500).end())
})

// show route
router.get('/:id', (req, res) => {
    show(req.params.id)
        .then(result => {
            const comedians = { id: result._id, name: result.name, age: result.age, status: d.status }
            res.json({comedians})
        })
        .catch(err => res.status(500).end())
})

// Create route
router.post('/', (req, res) => {
    const newData = {name: req.body.name, age: parseInt(req.body.age), status: req.body.status}
    create(newData)
        .then(result => {
            const comedians = { id: result.ops[0]._id, name: result.ops[0].name, age: result.ops[0].age, status: result.ops[0].status }
            res.status(201).json(comedians)
        })
        .catch(err => res.status(500).end())
})

// Update route
router.patch('/:id', (req, res) => {
    console.log('update', req.params.id)
    update(req.params.id)
        .then(result => {
            const comedians = { id: result.value._id, name: result.value.name, age: result.value.age, status: result.value.status }
            res.json({comedians})
        })
        .catch(err => res.status(500).end())
})

// delete route
router.delete('/:id', (req, res) => {
    destroy(req.params.id)
        .then(res.status(204))
        .catch(err => res.status(500).end())
})


module.exports = router;