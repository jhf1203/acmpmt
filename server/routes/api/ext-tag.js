const router = require('express').Router();

router.get('/tags', async (req, res) => {
  const tag = req.params.origin;

  const key = process.env.REACT_APP_LASTFM_API_KEY;

  let url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=${tag}&api_key=${key}&format=json`;

  res.send(url);
});

module.exports = router;