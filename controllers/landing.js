module.exports = function(app){

    const Blog = require('../mongodb_models/blog.js');

    app.get('/', (req, res, next)=>{
        res.redirect('/blogs')
    })

  

    app.get('/blogs',isLoggedIn , function(req, res){
        Blog.find({}, function(err, blogs){
            if (err) {
                console.log('Error retrieving data from DB, ' + err);
                res.render('register');
            }else{
                res.render('landing', {
                    data: blogs
                })
            }
        })
    })
    //save new blog to DB
    app.post('/blogs',function(req, res){
        Blog.create(req.body, function(err, blog){
            if (err) {
                res.json(err);
                console.log('Error saving data to DB, ' + err);
            }else{
                console.log('Blog has been saved!');
                res.json(blog);
            }
        })
      
    })
    //get blog from DB to edit
    app.get('/blogs/:id', isLoggedIn , function(req, res){
        Blog.find({_id: req.params.id}, function(err, blog){
            if (err) {
                console.log('Cannot find blog: ' + err)
            }else{
                res.json(blog)
            }
            
        });
    })
    //update actual blog by id
    app.put('/blogs/:id', function(req, res){
        console.log(req.params.id);
        Blog.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true},  function(err, updated){
            if(err){
                console.log()
            }else{
                console.log(updated);
                res.json(updated);
            }
        })
    })
    //delete blog by id
    app.delete('/blogs/:id', function(req, res){
        Blog.findByIdAndRemove({_id:req.params.id}, function(err, data){
            if (err) {
                console.log('Cannot remove blog: ' + err)
            }else{
                res.json(req.params.id)
            }
        })
    })


    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.render('login')
        }
    }
   
}