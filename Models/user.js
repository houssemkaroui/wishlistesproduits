const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');


const UserSchema = mongoose.Schema({
    nom:{
        type:String,
      //  require:true
    },
   
    
    email: {
        type: String,
        unique: true,
        required: true 
    },
    password: {
        type: String,
        unique: true,
        required: true 

    },

  
});




UserSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', UserSchema);

UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');



// Get user by ID
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// Get user by email
module.exports.getUserByEmail = function (email, callback) {
    const query = {
        email: email
    }
    User.findOne(query, callback);
},

// Créer compte user

module.exports.addUser = function(newUser,callback){
    bcrypt.genSalt(10, (err, salt) => {
        

        bcrypt.hash(newUser.password , salt,(err,hash)=>{
            if(err) throw (err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
// Comparer les mots de passe
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}