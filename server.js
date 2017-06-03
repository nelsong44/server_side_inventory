
//requires - importing built-in node modules to access their functionality
var express = require( 'express' );  // to create routes
var path = require( 'path' );
var bodyParser = require( 'body-parser' );
var app = express();  //setup express app

// listen - tell app to listen for requests on port 5678
app.listen( 5678, function(){
  console.log( 'server up on 5678' );
});

//uses
app.use( express.static( 'public' ) );  //HAVE TO DO THIS before linking scripts inside index.html
app.use( bodyParser.urlencoded( { extended: true } ) );  //url encoded data needs to be parsed for post request

// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile(path.resolve('views/index.html'));
}); // end base url

//globals
//empty array to push user-chosen items into
var inventoryList = [];

// pushing items received from client (user input) into array
app.post('/newItem', function(req, res) {
  console.log(req.body);
  inventoryList.push(req.body.item);
  console.log(inventoryList); // array of items
  res.send('new item object created');
}); // end post

// server response to client- this is the updated array to display
app.get('/allItems', function(req, res) {
  console.log('get /allItems hit');
  var itemArrayObject = {
    list: inventoryList
  }; //end object
    res.send(itemArrayObject);
}); // end get
