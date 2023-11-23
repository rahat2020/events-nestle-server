const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    photo: {
        type: String,
    },
})

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
    },
    reviewer: {
        type: String,
    },
}, {
    timestamps: true,
});
const attandanceSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    photos: {
        type: String,
    },
    email: {
        type: String,
    }
}, {
    timestamps: true,
});



const EventSchema = new mongoose.Schema({

    title: {
        type: String,
        require: true,
    },
    category: {
        type: String,
    },
    owner: {
        type: [userSchema],
    },
    desc: {
        type: String,
    },
    photos: {
        type: String,
    },
    available: {
        type: String,
    },
    location: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    price: {
        type: String,
    },
    attandance: [attandanceSchema],
    reviews: [reviewSchema],
}, {
    timestamps: true
})

module.exports = mongoose.model("Events", EventSchema);