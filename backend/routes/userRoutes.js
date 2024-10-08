const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')

router.get('/getUsers', userController.getUsers)
router.post('/createUser', userController.createUser)
router.delete('/deleteUser', userController.deleteUser)
router.put('/updateUser', userController.updateUser)

module.exports = router;