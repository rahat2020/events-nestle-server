const router = require('express').Router()
const { createNewEventsn, allEvents, getEventsById,deleteEvents } = require('../controllers/events')

// ADD Product
router.post('/add', createNewEventsn)
// GET Product
router.get('/get', allEvents)

// GET Product BY ID
router.get('/get/:id', getEventsById)

// DELETE product
router.delete('/delete/:id', deleteEvents)

module.exports = router;