const   express     = require('express'),
        mongoose    = require('mongoose'),
        bodyParser  = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

//connnect to MLAB mongodb

mongoose.connect('DBpath', { useNewUrlParser: true }).then(
    function(){
        console.log('Connected to MLAB blog_app database!');
    }    
).catch(function(err){
    console.log('Error connecting to MLAB blog_app database: ' + err);
})

//importing controllers
const landing = require('./controllers/landing');





//app settup
//*view engine
app.set('view engine', "ejs");
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//static folder setup
app.use(express.static('./public'));



//controllers
landing(app);



app.listen(port, ()=>{
    console.log('Server is running and listening on port: ' + port)
})