const express = require('express')
const router = express.Router()
const config = require('config')
const { genShortId } = require('../controller/func')
const validUrl = require('valid-url')

const Url = require('../models/Url')

// setiing endpoint

router.get('/', (req, res) => {
  res.send('this is url page')
})

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = config.get('baseUrl')
  const herokuUrl = config.get('herokuUrl')

  console.log(req.connection.remoteAddress)
  // check baseUrl
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('invalid baseurl')
  }
  // create url code
  const urlCode = genShortId(5)
  // check urlCode 這寫法極端的粗糙，但目前只做到這樣防止重複
  try {
    let url = await Url.findOne({ urlCode });
    if (url) {
      res.status(404).send('sorry urlCode seems to repeated,plz try again')
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('server error')
  }
  // check longUrl
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.render('index', { shortenUrl: url.shortUrl, urlCode: url.urlCode, url })
      } else {
        let shortUrl;
        if (process.env.HEROKU) {
          shortUrl = herokuUrl + '/' + urlCode;
        } else {
          shortUrl = baseUrl + '/' + urlCode;
        }
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
        await url.save();
        res.render('index', { shortenUrl: url.shortUrl, urlCode: url.urlCode, url })
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('server error')
    }
  } else {
    res.status(401).json('Invalid long url')
  }
})


module.exports = router