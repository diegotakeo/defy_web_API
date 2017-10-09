// LOAD MODULES (installed with npm)
var express = require('express'); //
var path = require('path'); // helps work with files system paths
var bodyParser = require('body-parser'); // helps parse form information

var index = require('./routes/index'); //two files in the folder routes (one for index page, and the api working with mongodb)
var api = require('./routes/api'); 

var port = 3000;

var app = express();

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
}); 


 