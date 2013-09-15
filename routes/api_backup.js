// routes/api.js

var Post = require('../models/Post');

/*
 * Serve JSON to our AngularJS client
 */

var data = {
  "posts": [
    {
      "title": "Title 1",
      "text": "Text 1"
    },
    {
      "title": "Title 2", 
      "text": "Text 2"
    }
  ]
};

exports.posts = function(req, res) {
  Post.find({}, 
    function(err, found_posts) {
			if (err) return next(err);
      var posts = found_posts;
			res.json({
				posts: posts
			});
  });

  /*
  data.posts.forEach(function(post, i) {
    if (post.title.length >= 15) {
			posts.push({
				id: i, 
				title: post.title.substr(0, 15) + '...',
				text: post.text.substr(0, 30) + '...'
			});
    } else {
			posts.push({
				id: i, 
				title: post.title,
				text: post.text.substr(0, 30) + '...'
      });
    }
  });
  
  res.json({
    posts: posts
  });
  */
};

exports.post = function(req, res){
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// Post

exports.addPost = function(req, res) {
  // New save to database statement
  Post.create({
    title: req.body.title,
    text: req.body.text 
  }, function(err) {
    if (err) return next(err);
    res.redirect('/');
  });  
  console.log('added');
};

// Put
exports.editPost = function(req, res) {
  var id = req.params.id;
  
  if (id >= 0 && id < data.posts.length) {
    data.posts[id] = req.body;
    res.json(true);
  } else {
    res.json(false);
  }
};

// Delete
exports.deletePost = function(req, res) {
  var id = req.params.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};
