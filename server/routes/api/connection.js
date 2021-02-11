const router = require("express").Router();
const connectionController = require("../../controllers/connectionController");

router.route("/:id")

.put(connectionController.followUser)
.patch(connectionController.followerAdd)

router
.route("/remove/:id")
.put(connectionController.unFollow)

module.exports = router