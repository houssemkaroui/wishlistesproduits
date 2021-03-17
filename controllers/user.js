const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../Models/user');
const config = require('../config/db');

// pour le register dun user
router.post('/register', (req, res) => {
    var newUser = new User({
        nom:req.body.nom,
        email:req.body.email,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
      if(err) {
        res.status(500).send(err);
      }else {
        res.status(200).send(user)
      }
     

        
        
        
    });
});





//pour l'authentification
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;


  // console.log(sess);

  User.getUserByEmail(email, (err, user) => {
 
      if (err) throw err;
      User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
              const token = jwt.sign({
                  type: "users",
                  data: {
                      _id: user._id,
                      password:user.password,
                      email: user.email ,
                  }
              }, config.secret, {
                  expiresIn: 604800 // le token expisre 
              });

              return res.json({
                  success: true,
                  token: "JWT " + token
              });
          } else {
              return res.status(404).send({
                  error: false,
                  message: "mot de passe erroné."
              });
          }
      });
  });
});








module.exports = router;