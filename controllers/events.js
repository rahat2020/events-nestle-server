const Events = require('../models/Events');

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
const allEvents = async (req, res) => {
    try {
        const articles = await Events.find()
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getEventsById = async (req, res, next) => {
    try {
        const articles = await Events.findById(req.params.id)
        res.status(200).json(articles)
    } catch (err) {
        console.log(err)
        next(err)
    }
}
const deleteEvents = async (req, res, next) => {
    try {
        await Events.findByIdAndDelete(req.params.id)
        res.status(200).json('product is deleted')
    } catch (err) {
        console.log(err)
        next(err)
    }
}
module.exports = {
    createNewEventsn,
    allEvents,
    getEventsById,
    deleteEvents
}