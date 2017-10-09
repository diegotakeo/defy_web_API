var express = require('express');   // brings express to use his router
var router = express.Router();      //

// SETS ROUTER                            // (normal GET REQUEST at localhost/ DELIVERS index.html)
router.get('/', function(req, res, next){ // takes parameters (request, response, next)
    
    // (L8R) maybe index is not necessary for a API (we just need /api/user, /api/posts, etc)
    res.send('index.html'); 

});

// EXPORT THIS (so we can access this from other files)
module.exports = router;

