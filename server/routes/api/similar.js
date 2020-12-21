const router = require('express').Router();

// Getting similar artists based off of input

router.get('/:artist', async (req, res) => {
  const artist = req.params.artist;

  const key = process.env.REACT_APP_LASTFM_API_KEY;

  let url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar=${tag}&api_key=${key}&format=json`;

  res.send(url);
});

module.exports = router;