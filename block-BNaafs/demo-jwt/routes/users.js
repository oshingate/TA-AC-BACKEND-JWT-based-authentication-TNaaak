var express = require('express');
var User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//register new user

router.post('/new', async (req, res, next) => {
  try {
    let createdUser = await User.create(req.body);

    res.status(200).json({ user: createdUser });
  } catch (error) {
    next(error);
  }
});

//login user

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
  }

  try {
    let user = await User.find({ email });

    if (!user) {
      return res.status(400).json({ error: 'Incorrect Email' });
    }

    let result = await user.verifyPassword(password);

    if (!result) {
      return res.status(400).json({ error: 'invalid password' });
    }
    //successful login
    var token = await user.createToken();
    res.json(user, token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
