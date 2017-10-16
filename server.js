// LOAD MODULES (installed with npm)
var express = require('express'); //
var path = require('path'); // helps work with files system paths
var bodyParser = require('body-parser'); // helps parse form information

var index = require('./routes/index'); //two files in the folder routes (one for index page, and the api working with mongodb)
var api = require('./routes/api'); 

var port = 8080;

// APP = EXPRESS (wherever you see app.method(), you're using EXPRESS!!)
var app = express();

// ------------------------------------------------------------------
// MIDDLEWARE (always before junk)
// They are functions that have access to req + res and also access to the next piece of middleware fired after him
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}
app.use(logger);


// ADD HEADERS (ajax cross-domain issue fix)
app.use(function (req, res, next) {
    
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });


// ------------------------------------------------------------------
// VIEW ENGINE (especify VIEWS will be in the views folder)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile); // tells to render 

// SET STATIC FOLDER (where we put all the ANGULAR stuff, "client" folder)
app.use(express.static(path.join(__dirname, 'client')));

// BODY PARSER (middleware for form parsing)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CREATE ROUTES ('/' is the home page, associated with the index)
app.use('/', index);
app.use('/api', api); //anyone who interacts with API uses /api URL


// TRIGGER LISTEN (so we can run our server)
app.listen(port, function(){
    console.log('Server started on port '+port);
    console.log('Press Ctrl+C to quit...');
}); 


 