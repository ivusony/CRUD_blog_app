module.exports = function(app){

    const Blog = require('../mongodb_models/blog.js');

    app.get('/', function(req, res){
        Blog.find({}, function(err, blogs){
            if (err) {
                console.log('Error retrieving data from DB, ' + err)
            }else{
                res.render('landing', {
                    data: blogs
                })
            }
        })
    })
    //save new blog to DB
    app.post('/', function(req, res){
        Blog.create(req.body, function(err, blog){
            if (err) {
                console.log('Error saving data to DB, ' + err)
            }else{
                console.log('Blog has been saved!');
                res.json(blog);
            }
        })
      
    })
    //get blog from DB to edit
    app.get('/:id', function(req, res){
        Blog.find({_id: req.params.id}, function(err, blog){
            if (err) {
                console.log('Cannot find blog: ' + err)
            }else{
                res.json(blog)
            }
            
        });
    })
    //update actual blog by id
    app.put('/:id', function(req, res){
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
    app.delete('/:id', function(req, res){
        Blog.findByIdAndRemove({_id:req.params.id}, function(err, data){
            if (err) {
                console.log('Cannot remove blog: ' + err)
            }else{
                res.json(req.params.id)
            }
        })
    })
   
}