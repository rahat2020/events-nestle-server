const router = require('express').Router()
const { createNewEventsn, allEvents, getEventsById,deleteEvents } = require('../controllers/events')

// ADD EVENTS
router.post('/add', createNewEventsn)
// GET EVENTS
router.get('/get', allEvents)
// GET EVENTS BY ID
router.get('/get/:id', getEventsById)
// DELETE EVENTS
router.delete('/delete/:id', deleteEvents)

module.exports = router;