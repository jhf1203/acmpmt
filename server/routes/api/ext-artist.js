const router = require('express').Router();

router.get('/artists', async (req, res) => {
  const artist = req.params.origin;

  const key = process.env.REACT_APP_LASTFM_API_KEY;

  let url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist}&api_key=${key}&format=json`;

  res.send(url);
});

module.exports = router;