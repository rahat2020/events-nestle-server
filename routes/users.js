const router = require('express').Router();
const {
    allUsers, getUsersById, register, login, update, deleteUsers, userByEmail, getUserData
} = require('../controllers/user');

// CREATE NEW USER
router.post('/register', register)
// LOGIN USER
router.post('/login', login)
// GET LOGGED IN USER DATA
router.get('/user', getUserData)
// UPDATE USER 
router.put('/update-user/:id', update)
// GET ALL USERS
router.get('/allUsers', allUsers)
// GET USER THROUGH EMAIL
router.get('/user-data', userByEmail)
// GET USER BY ID
router.get('/user/:id', getUsersById)
// DELETE USER
router.delete('/deleteuser/:id', deleteUsers)

module.exports = router;