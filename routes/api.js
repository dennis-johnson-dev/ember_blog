// routes/api.js

var Post = require('../models/Post');

/*
 * Serve JSON to our AngularJS client
 */

// Get Posts
exports.posts = function(req, res) {
  Post.find({}, 
    function(err, found_posts) {
			if (err) return next(err);
      var posts = found_posts;
			res.json({
				posts: posts
			});
  });
};

// Get Single Post
exports.post = function(req, res){
  var id = req.params.id;
 
  Post.find({ _id: id},
    function(err, found_post) {
      if(err) return next(err); 
      res.json({
        post: found_post[0]
      });
    });
};

// Delete
exports.deletePost = function(req, res) {
  var id = req.params.id;
 
  Post.remove({ _id: id}, function(err) {
    if (err) return next(err);
    res.send(200); 
  });
  console.log('Item deleted!');
};

// Add Post
exports.addPost = function(req, res) {
  // New save to database statement
  Post.create({
    title: req.body.title,
    text: req.body.text 
  }, function(err) {
    if (err) return next(err);
    res.send(200);
  });  
  console.log('added');
};


// Update Post 
exports.editPost = function(req, res) {
  var id = req.params.id;
 
  Post.update({ _id: id }, {
    title: req.body.title,
    text:  req.body.text 
  }, {
    upsert: true
  }, function(err) {
    if (err) return next(err);  
  });
  console.log('Item Updated!');
  res.send(200);
};

