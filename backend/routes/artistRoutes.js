const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// controller declare
const {
  fetchAllArtist,
  fetchArtsitById,
  deleteArtistById,
  addArtist,
  searchArtist,
} = require("../controller/artistController");

// import authentication
const protectRoute = require("../middleware/authMiddleware");

//image upload multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

// fetch artist
router.get("/", fetchAllArtist);

// fetch artist by id
router.get("/:id", protectRoute, fetchArtsitById);

// delete artist
router.delete("/:id", protectRoute, deleteArtistById);

// add artist
router.post("/", upload, protectRoute, addArtist);

// search artist
router.get("/search/:key", protectRoute, searchArtist);

module.exports = router;
