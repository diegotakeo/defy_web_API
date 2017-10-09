var express = require('express');   // brings express to use his router
var router = express.Router();      //

var mongojs = require('mongojs');   // brings in mongo module
var db = mongojs('mongodb://defy:!compartilhabilidade64@ds113835.mlab.com:13835/defy', ['users, posts, title, follows, comments, follows, challenges, categories, badges, counters']); 
//var db = mongojs('mongodb://defy:compartilhabilidade@defy-shard-00-00-xea6d.mongodb.net:27017,defy-shard-00-01-xea6d.mongodb.net:27017,defy-shard-00-02-xea6d.mongodb.net:27017/test?ssl=true&replicaSet=defy-shard-0&authSource=admin'
//, ['user, posts, title, follows, comments, follows, challenges, categories, badges, counters']);  
// stablish connection: get mLab URI (connect using driver)
    // [] parameter to select collections 
    // user {titles:{}, selected:'',  }
    // user level = badge
    // posts {liked_by: {id list}, disliked_by: {id list}}

// ---------------------------------------------------------------------------------------------
// [ ROUTERS ]
// API PAGE (localhost/api/<name> triggers this)

// [ GET ALL USERS ]-----> (test by typing URL: localhost:3000/user)
router.get('/user', function(req, res, next){ // takes parameters (request, response, next)
    db.users.find(function(err, users){
        if(err) // --------- IF ERROR
            res.send(err);
        
        res.json(users); // ------ WRITES JSON!
    });
}); // (accepts the GET request)

// [ GET SINGLE USER ] -----> (test by typing URL: localhost:3000/user/<username>)
router.get('/user/:username', function(req, res, next){
    db.users.findOne({username: req.params.username}, function(err, user){
        if(err)
            res.send(err);
        
        res.json(user); 
    });
}); 

// [ INSERT USER ] -----> (test POST using POSTMAN or hold until finish ANGULAR)
router.post('/user', function(req, res, next){
    var user = req.body; //GET INFO FROM FORM
   
    // VALIDATIONS
    if (!user.username || !user.name){
        res.status(400); // SENDS ERROR STATUS
        res.json({
            "error": "Bad Data"
        });
    } else {
        // INSERT SERIALIZED USER INTO DB
        db.user.save(user, function(err, user){
            if(err)
                res.send(err);
        
            res.json(user); 
        });
    }

});

// [ DELETE USER ] -----> (test DELETE using POSTMAN or hold until finish ANGULAR)
router.delete('/user/:username', function(req, res, next){
    db.users.remove({username: req.params.username}, function(err, user){
        if(err)
            res.send(err);
        
        res.json(user); 
    });
}); 

// [ UPDATE USER ] -----> (test PUT using POSTMAN or hold until finish ANGULAR)
router.put('/user/:username', function(req, res, next){
   var user = req.body; //GET INFO FROM FORM
   var updated_user = {};

   if (user.name)           updated_user.name           = user.name;
   if (user.username)       updated_user.username       = user.username;
   if (user.gender)         updated_user.gender         = user.gender;
   if (user.email)          updated_user.email          = user.email;
   if (user.address)        updated_user.address        = user.address;
   if (user.about)          updated_user.about          = user.about;
   if (user.lv)             updated_user.lv             = user.lv;
   if (user.xp)             updated_user.xp             = user.xp;
   if (user.views)          updated_user.views          = user.views;
   if (user.is_private)     updated_user.is_private     = user.is_private;
   if (user.selected_title) updated_user.selected_title = user.selected_title;
   
   // TO APPEND (not REPLACE)
   if (user.unread_notifications)   updated_user.unread_notifications   = user.unread_notifications;
   if (user.titles)                 updated_user.titles                 = user.titles;
   
   // CHANGE LATER TO ITS OWN DOCUMENT (get + insert + update + remove POST/COMMENTS/LIKED DISLIKED/FOLLOWS)
   if (user.liked_posts)    updated_user.liked_posts   = user.liked_posts;
   if (user.following)      updated_user.following     = user.following;
   if (user.followed)       updated_user.followed      = user.followed;
   if (user.user_posts)     updated_user.user_posts    = user.user_posts;
    if (user.comments)      updated_user.comments      = user.comments;
   

   // VALIDATION
   if (!updated_user) {
       res.status(400);         // THROW ERROR STATUS
       res.json({
           "error": "Bad Data" // BAD INPUT
       });
   } 
   // SUCCESS
   else {
    db.users.update({username: req.params.username}, updated_user, {}, function(err, user){ 
        if(err)
            res.send(err);
        
        res.json(user); 
    });
   }
}); 
// ------------------------------------------------------------------------ //
// [END OF USER CRUD]




// [ GET POSTS ] 
router.get('/posts', function(req, res, next){
    db.posts.find(function(err, posts){
        if(err)
            res.send(err);
        res.json(posts);
    });
    res.send('POSTS API PAGE');
});

// [ GET COMMENTS ]
router.get('/comments', function(){
    db.posts.find(function(err, comments){
        if(err)
            res.send(err);
        res.json(comments);
    });
});

// ---------------------------------------------------------------------------------------------
// EXPORT THIS (so we can access this from other files)
module.exports = router;