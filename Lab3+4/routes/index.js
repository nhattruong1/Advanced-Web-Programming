const { Router } = require('express');
var express = require('express');
var router = express.Router();

let items = [
  {
    id: 1,
    name: 'iphone 12 mini',
    price: 2000000,
  },
  {
    id: 2,
    name: 'iphone 12',
    price: 2200000,
  },
  {
    id: 3,
    name: 'iphone 12 pro',
    price: 2500000,
  },
  {
    id: 4,
    name: 'iphone 12 pro max',
    price: 2500000,
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.User){
    let title = `Xin chào ${req.session.User.name}`
    res.render('index', { title ,items});
  }else{
    res.redirect('/login');
  }
});

let email = 'truongvo.dev@gmail.com';
let password = '123'

router.post('/login', function(req, res, next) {
  console.log({
    "email": req.body.email,
    "password": req.body.password,
  });
  if(req.body.email === email && req.body.password === password){
    req.session.User = {
      name: req.body.email
    }
    res.redirect('/');
  }else{
    let login = false;
    res.render('login', {login})
  }
});

router.get('/login', function(req, res, next) {
  if(req.session.User){
    res.redirect('/');
  }else{
    res.render('login')
  }
});

module.exports = router;
