const router = require("express").Router();
const connectionController = require("../../controllers/connectionController");

router.route("/:id")

.put(connectionController.followUser)
.patch(connectionController.followerAdd)

module.exports = router