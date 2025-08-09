var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users')
/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register',function(req,res,next){
  res.render('/register')
})

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req,res,next){
  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email
  })
  userModel.register(userdata, req.body.password)
    .then(function (registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/')
      })
    })
})
router.post("login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/login"
}),function(req,res){})

function isLoggedIn(req,res,next){
  if (req.authenticated()){
    return next();
  }
  else {
    res.redirect('/login')
  }
}
module.exports = router;
