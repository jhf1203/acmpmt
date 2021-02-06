const router = require("express").Router();
const profileRoutes = require("./profile");
const albumRoutes = require("./album")
const similarRoutes = require("./similar")
const topAlbumRoutes = require("./topalbum")
const connectionRoutes = require("./connection")


// Book routes
router.use("/profile", profileRoutes);
router.use("/album", albumRoutes);
router.use("/similar", similarRoutes);
router.use("/topalbum", topAlbumRoutes);
router.use("/connection", connectionRoutes)

module.exports = router;
