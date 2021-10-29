// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).json({ message: "actions router synced"});
})

router.get('/:id', (req, res) => {
    res.status(200).json('nice');
})

router.post('/', (req, res) => {
    res.status(200).json('nice');
})

router.put('/:id', (req, res) => {
    res.status(200).json('nice');
})

router.delete('/:id', (req, res) => {
    res.status(200).json('nice');
})


module.exports = router;