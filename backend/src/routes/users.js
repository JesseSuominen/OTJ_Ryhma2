const express = require('express');
const { 
    registerUser,
    login
} = require('../controllers/users');


const router = express.Router();

// http://localhost:5000/api/cities 

router.route('/signup')
  .post(registerUser)

  router.route('/login')
  .post(login)

module.exports = router;