module.exports = function(app, passport){

  // Login
  app.get('/login', function(req, res){
    res.render('login', { message: req.flash('loginMessage') });
  });

  // Login
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/secret',
    failureRedirect : '/login',
    failureFlash: true
  }));

  //
  app.get('/2fa', function(req, res){
    res.render('2fa', { message: req.flash('loginMessage') });
  });

  app.post('/2fa', function(req, res){
    res.render('2fa', { message: req.flash('loginMessage') });
  });


  // Sign up
  app.get('/', function(req, res){
    res.render('secret', { message: req.flash('loginMessage') });
  });


  // Secret
  app.get('/secret', function(req, res){
    res.render('secret', { message: req.flash('loginMessage') });
  });

  // logout
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

}