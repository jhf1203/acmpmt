const router = require("express").Router();
const profileController = require("../../controllers/profileController");

// Matches with "/api/profile"
router.route("/")
  .get(profileController.findAll)
  .post(profileController.create);

// Matches with "/api/profile/:id"
router
  .route("/:id")
  .get(profileController.findById)
  // .put(profileController.update)
  .put(profileController.updateRecs)
  .delete(profileController.remove)
  .patch(profileController.updateQueue)

router
  .route("/images/:id")
  .put(profileController.updateImage)


module.exports = router;
