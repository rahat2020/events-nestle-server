const router = require('express').Router()
const { createNewEventsn, allEvents, getEventsById, deleteEvents, attandInEvents, updateEvent } = require('../controllers/events')

// ADD EVENTS
router.post('/add', createNewEventsn)
// GET EVENTS
router.get('/get', allEvents)
// GET EVENTS BY ID
router.get('/get/:id', getEventsById)
// UPDATE POST
router.put('/update/:id', updateEvent)
// ATTANTD IN THE EVENT 
router.post('/attand/:id', attandInEvents);
// DELETE EVENTS
router.delete('/delete/:id', deleteEvents)

module.exports = router;