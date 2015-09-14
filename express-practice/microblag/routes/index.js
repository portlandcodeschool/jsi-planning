var express = require('express');
var router = express.Router();

function byName (name) {
  return (function (val) {
    return (name == val);
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var cookie = req.cookies.user;
  if(cookie) {
    var posts = req.app.locals.posts;
    res.render('index', { user: cookie, posts: posts });
  }
  else {
    res.render('login');
  }
});

router.get('/posts.json', function (req, res) {
  res.json({posts: req.app.locals.posts});
});

router.get('/user/:name', function(req, res) {
  var name = req.params.name;
  var posts = req.app.locals.posts.filter(byName(name));
  res.render('posts', {user : name, posts: posts});
});

router.post('/:user', function(req, res) {
  var text = req.body.text;
  var user = req.params.user;
  req.app.locals.posts.unshift({ user: user, text: text});
});

module.exports = router;
