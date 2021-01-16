const router = require("express").Router();
const profileRoutes = require("./profile");
const albumRoutes = require("./album")
const similarRoutes = require("./similar")
const topAlbumRoutes = require("./topalbum")

// Book routes
router.use("/profile", profileRoutes);
router.use("/album", albumRoutes);
router.use("/similar", similarRoutes);
router.use("/topalbum", topAlbumRoutes)

module.exports = router;
