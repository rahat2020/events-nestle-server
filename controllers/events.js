const Events = require('../models/Events');

// CREATE NEW  EVENT
const createNewEventsn = async (req, res) => {
    try {
        const pd = await Events(req.body)
        const save = await pd.save()
    save && res.status(200).json('Event created')

        // console.log(save)
    } catch (err) {
        next(err);
        console.log(err);
    }
}
// UPDATE EVENT
const updateEvent = async (req, res, next) => {
    try {
        const posts = await Events.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        posts && res.status(200).json('event updated')
        console.log(res)
    } catch (err) {
        next(err)
        console.log(err)
    }
};
// GET ALL EVENTS
const allEvents = async (req, res) => {
    try {
        const articles = await Events.find()
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
// GET SINGLE EVENT BY ID
const getEventsById = async (req, res, next) => {
    try {
        const articles = await Events.findById(req.params.id)
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

// ATTENDING IN EVENT
const attandInEvents = async (req, res, next) => {
    const id = req.params.id
    const { username, email, photos } = req.body
    try {
        const posts = await Events.findById(id)
        if (!posts) {
            res.status(404).json('event not found')
        }
        const attandceObj = {
            username, email, photos
        }
        posts.attandance.push(attandceObj);
        await posts.save()
        res.status(200).json('attandce confirmed')
    } catch (err) {
        // res.status(500).json('internal server error')
        // console.log(err)
        next(err)
    }
};

// DELETE EVENT
const deleteEvents = async (req, res, next) => {
    try {
        await Events.findByIdAndDelete(req.params.id)
        res.status(200).json('event deleted')
    } catch (err) {
        console.log(err)
        next(err)
    }
}
module.exports = {
    createNewEventsn,
    allEvents,
    getEventsById,
    deleteEvents,
    attandInEvents,
    updateEvent,
}