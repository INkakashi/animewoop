var express = require('express');
var router = express.Router();
const passport = require('passport')
const userModel = require('./users')
const localStrategy = require('passport-local')

passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register',function(req,res,next){
  res.render('register')
})
router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err) {return next(err);}
    res.redirect('/login')
  })

})
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
router.post("/ login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/login"
}),function(req,res){})



function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  else {
    res.redirect('/login')
  }
}

module.exports = router;
