const Events = require('../models/Events');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// CREATE NEW USER
const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
            role: req.body.role,
            isAdmin: req.body.isAdmin,
        })
        const saved = await user.save();
        saved && res.status(200).json('registration successfull');
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            // Duplicate key error for the 'email' field
            res.status(400).json('Email address already in use');
        } else {
            // Handle other errors
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
        next(err);
        // console.log(err)
    }
}

// LOGIN
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(404).json('wrong credentials')

        const isValidated = await bcrypt.compareSync(req.body.password, user.password)
        !isValidated && res.status(404).json('wrong credentials')

        const { password, isAdmin, ...others } = user._doc;

        // res.status(200).json(...others);
        res.status(200).json({ message: 'Login successful', ...others });
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // }).status(200).json({ ...others});
    } catch (err) {
        next(err);
        console.log(err);
    }
}

// UPDATE USER
const update = async (req, res, next) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const update = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true }
            )
            update && res.status(200).json({ message: 'user updated' })
            console.log(update)
        } catch (err) {
            next(err);
            console.log(err)
        }
    } else {
        res.status(401).json("You can update only your account!");
    }

}

// FIND USER THROUGH EMAIL
const userByEmail = async (req, res, next) => {
    try {
        const email = req.query.email;
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user data
        res.status(200).json(user);
    } catch (error) {
        next(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

// GET ALL USERS
const allUsers = async (req, res, next) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
        console.log(user)
    } catch (err) {
        next(err);
        console.log(err)
    }
}

// GET USER BY ID
const getUsersById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}

// GET LOGGED IN USER DATA
const getUserData = async (req, res, next) => {
    const email = req.query.email
    try {
        const getEventsData = await Events.find({ 'owner.email': email })
        res.status(200).json(getEventsData)
        // console.log(getData)
    } catch (err) {
        next(err);
    }
}
// DELETE USERS
const deleteUsers = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user deleted')
    } catch (err) {
        next(err);
    }
}
module.exports = {
    allUsers, getUsersById, register, login, update, deleteUsers, userByEmail, getUserData
}