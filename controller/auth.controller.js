const User = require('../model/User'); 
const passport = require('passport'); 
 
// Render the registration page 
exports.getRegister = (req, res) => { 
    res.render('register'); 
}; 
 
// Handle user registration 
exports.post = async (req, res) => { 
    const { username, password } = req.body; 
    try { 
        const newUser = new User({ username, password }); 
        await newUser.save(); 
        res.redirect('/auth/login'); 
    } catch (err) { 
        res.status(500).send('Server Error'); 
    }   
}; 
 
// Render the login page 
exports.get = (req, res) => { 
    res.render('login', { error: req.flash('error') }); 
}; 
 
// Handle user login 
exports.post = passport.authenticate('local', { 
    successRedirect: '/tasks', 
    failureRedirect: '/auth/register', 
    failureFlash: true 
}); 
 
// Handle user logout 
exports.logout = (req, res) => { 
    req.logout(function(err) { 
        if (err) { 
            return next(err); 
        } 
        res.redirect('/auth/login'); 
    }); 
};