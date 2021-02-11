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
  .put(profileController.updateQueue)
  .patch(profileController.updateRecs)

router
  .route("/images/:id")
  .put(profileController.updateImage)

router
  .route("/queue/:id")
  .put(profileController.removeFromQueue)
  // .put(profileController.addToQueue)

router
  .route("/recommended/:id")
  .put(profileController.removeFromRecs)
  // .put(profileController.updateRecs)

  
module.exports = router;
