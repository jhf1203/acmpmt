const router = require('express').Router();
const fetch = require("node-fetch")

// Getting similar artists based off of input

router.get('/:artist', async (req, res) => {
  const artist = req.params.artist;
  
  const key = process.env.REACT_APP_LASTFM_API_KEY;
  let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist}&api_key=${key}&format=json`;

  const retrieve = await fetch(url);
  const data = await retrieve.json();
  res.json(data)
});

module.exports = router;