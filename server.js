const   express     = require('express'),
        mongoose    = require('mongoose'),
        bodyParser  = require('body-parser'),
        passport   = require('passport'),
        LocalStrategy = require('passport-local'),
        expressSession = require('express-session');



const port = process.env.PORT || 3000;

//connnect to MLAB mongodb

mongoose.connect('mongodb://admin:admin1234@ds016128.mlab.com:16128/blog_app', { useNewUrlParser: true }).then(
    function(){
        console.log('Connected to MLAB blog_app database!');
    }    
).catch(function(err){
    console.log('Error connecting to MLAB blog_app database: ' + err);
})


const User = require('./mongodb_models/user.js');


//importing controllers
const landing = require('./controllers/landing');
const auth = require('./controllers/auth');



const app = express();


//app setup
//*view engine
app.set('view engine', "ejs");
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//static folder setup
app.use(express.static('./public'));

//PASSPORT

app.use(expressSession({
    secret: 'Radulov',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

auth(app);
landing(app);



app.listen(port, ()=>{
    console.log('Server is running and listening on port: ' + port)
})