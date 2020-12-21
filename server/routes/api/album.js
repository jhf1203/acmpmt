const router = require('express').Router();

// Getting the actual album info from the top album for each artist

router.get('/:artist/:album', async (req, res) => {
  const artist = req.params.artist;

  const key = process.env.REACT_APP_LASTFM_API_KEY;

  let url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${key}&artist=${artist}&album=${album}format=json`;

  res.send(url);
});

module.exports = router;