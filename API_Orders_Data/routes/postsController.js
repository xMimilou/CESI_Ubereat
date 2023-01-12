const express = require('express');
const router = express.Router();

const { PostsModel } = require('../models/postsModel');

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  })
});

module.exports = router;