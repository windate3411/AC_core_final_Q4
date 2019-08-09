const express = require('express')
const router = express.Router()
const Url = require('../models/Url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      res.redirect(url.longUrl)
    } else {
      return res.status(404).json('url not found')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('server error')
  }
})


module.exports = router