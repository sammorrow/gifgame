const express = require('express');
const app = express();
const path = require('path')
const $PORT = process.env.PORT || 8080
const secrets = require('../secrets')
const axios = require('axios');
app.listen($PORT, () => {
  console.log(`server listening on ${$PORT}`)
})

app
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/fetch/:search', (req, res) => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${req.params.search}&api_key=${secrets.key}&limit=9`)
    .then(res => res.data.data)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  })
  .use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })