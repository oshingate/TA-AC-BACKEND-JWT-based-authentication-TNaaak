var express = require('express');
var router = express.Router();

var User = require('../models/User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//register user

router.post('/register', async (req, res, next) => {
  let data = req.body;

  try {
    var user = await User.findOne({ email: data.email });
    if (user) {
      return res.json({ error: 'user exist try login' });
    }
    if (!user) {
      let createdUser = await User.create(data);
      res.json({ user: createdUser });
    }
  } catch (error) {
    next(error);
  }
});

//login user

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: 'email/password required' });
  }

  let user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: 'email did not match try registring user' });
  }

  let result = await user.verifyPassword(password);

  if (!result) {
    return res.status(400).json({ error: "password didn't match" });
  }

  let token = await user.createToken();

  res.json({ user, token });
});

module.exports = router;
