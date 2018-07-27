module.exports = function(app){
    const passport   = require('passport');
    

    const User = require('../mongodb_models/user.js');



    //ROUTES

    //Show form

    app.get('/auth', (req, res)=>{
        res.render('auth');
    })

}