module.exports = function(app){
    const passport   = require('passport');
    

    const User = require('../mongodb_models/user.js');



    //ROUTES

    //Show form

    app.get('/login', (req, res)=>{
        res.render('login');
    })

    app.get('/register', (req, res)=>{
        res.render('register');
    })

    app.post('/register', function(req, res){
        console.log(req.body);
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                console.log(err)
            }else{
                res.redirect('/login')
            }
        })
    })

    app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/blogs',
        failureRedirect: '/login'
    }
    ),function(req, res){
        console.log(req.body)
    })

}