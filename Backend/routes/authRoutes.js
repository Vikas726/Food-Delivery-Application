const express = require('express')
const router = express.Router();
const {register,login,getUser,getAllUser,updateUser,deleteUser} = require('../controllers/authControllers');


router.post('/login',login);
router.post('/register',register);
router.get('/get-user/:id',getUser);
router.get('/get-all-user',getAllUser);
router.patch('/update-user/:id',updateUser);
router.delete('/delete-user/:id',deleteUser);


module.exports = router;