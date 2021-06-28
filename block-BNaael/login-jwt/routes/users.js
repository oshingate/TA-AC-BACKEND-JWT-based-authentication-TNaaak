var express = require('express');
var User = require('../models/User');
var auth = require('../middlewares/auth');
var router = express.Router();

/* GET users listing. */
router.get('/', auth.validateUser, function (req, res, next) {
  res.json({ user: req.user });
});

//user registration

router.post('/new', async (req, res, next) => {
  try {
    let user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

//user login

router.post('/login', async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ error: 'email/password required' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: 'user not registered',
      });
    }

    let result = await user.verifyPassword(password);

    if (!result) {
      return res.json({ error: 'password not match' });
    }

    //login successfull

    let token = await user.createtoken();

    return res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
