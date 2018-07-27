module.exports = function(app){
    const passport   = require('passport');
    

    const User = require('../mongodb_models/user.js');



    //ROUTES

    //Show form

    app.get('/auth', (req, res)=>{
        res.render('auth');
    })

    app.post('/register', function(req, res){
        User.register(new User({username: req.body.username}), req.body.password, function(err, user){
            if(err){
                res.status(400).send(err);
                return
            }else{
                passport.authenticate('local')(req, res, function(){
                    res.status(200).send({ success: 'success'});
                })
            }
        })
    })

    app.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/blogs',
        failureRedirect: '/auth'
    }
    ),function(req, res){
        res.status(200).send({ error: "boo:(" });
    })

}