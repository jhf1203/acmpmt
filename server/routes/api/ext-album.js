const router = require('express').Router();

router.get('/artists', async (req, res) => {
  const artist = req.params.origin;

  const key = process.env.REACT_APP_SPOTIFY_API_KEY;

  let url = `GET https://api.spotify.com/v1/search?q=album:${album}%20artist:${artist}&type=album`;

  res.send(url);
});

module.exports = router;