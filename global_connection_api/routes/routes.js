const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const mongodb = require('mongodb');

router.post('/register', async (req, res) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  })

  const result = await user.save()

  const { password, ...data } = await result.toJSON()

  res.send(data);
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send({
      message: "user not found"
    })
  }

  if (!await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).send({
      message: "invalid credentials"
    })
  }

  const token = jwt.sign({ _id: user._id }, "secret")

  res.cookie('jwt', token, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.send({
    message: 'success',
    token: token,
    first_name: user.first_name,
    last_name: user.last_name
  });
})

router.get('/user', async (req, res) => {
  try {
    const cookie = req.headers.authorization.split(' ')[1];
    const claims = jwt.verify(cookie, 'secret')

    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated"
      })
    }

    const user = await User.findOne({ _id: claims._id })

    const { password, ...data } = await user.toJSON()

    res.send(data)
  } catch (e) {
    return res.status(401).send({
      message: "unauthenticated"
    })
  }
})

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 })

  res.send({
    message: 'success'
  })
})

router.post('/delete_account', async (req, res) => {
  try {
    // First, get the password from the request body
    const password = req.body.password;

    // Then, get the JWT from the request headers
    const token = req.body.token
    const claims = jwt.verify(token, 'secret');
    console.log("log1: " + token);
    console.log("log2: " + claims._id)
    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated2'
      });
    }
    // Find the user with the matching ID and password
    const _id = mongodb.ObjectId(claims._id);

    const user = await User.findOne({ _id })

    if (user && await bcrypt.compare(user.password, password)) {
      // If no user was found, send a response with a status code of 401 (Unauthorized)
      return res.status(401).send({
        message: 'incorrect password'
      });
    }

    // If the user was found, delete the user document from the collection
    await User.deleteOne({ _id: claims._id });

    // Send a response with a status code of 200 (OK)
    res.sendStatus(200);
  } catch (error) {
    return res.status(401).send({
      message: 'unauthenticated3'
    });
  }
});

router.post('/edit_account', async (req, res) => {
  try {
    // First, get the password from the request body

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const token = req.body.token

    const claims = jwt.verify(token, 'secret');
    if (!claims) {
      return res.status(401).send({
        message: 'unauthenticated1'
      });
    }
    // Find the user with the matching ID and password
    const _id = mongodb.ObjectId(claims._id);
    const user = await User.findOne({ _id })

    if (!user) {
      // If no user was found, send a response with a status code of 401 (Unauthorized)
      return res.status(401).send({
        message: 'incorrect password'
      });
    }

    // If the user was found, change the first_name, last_name and email if there are different 
    if (user.first_name !== first_name) {
      user.first_name = first_name;
    }
    if (user.last_name !== last_name) {
      user.last_name = last_name;
    }
    if (user.email !== email) {
      user.email = email;
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    if (user.password !== hashedPassword) {
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    // Send a response with a status code of 200 (OK)
    res.sendStatus(200);
  } catch (error) {
    return res.status(401).send({
      message: 'unauthenticated2'
    });
  }
});

module.exports = router;