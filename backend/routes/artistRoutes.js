const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// artist model import
const Artist = require("../models/artistModel");

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });

//   const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };

//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });

//image upload
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
router.get("/", async (req, res) => {
  try {
    const artist = await Artist.find();
    if (artist) {
      return res.status(201).json(artist);
    }
    // await Artist.find().exec((err, artist) => {
    //     if (err) {
    //       return res.status(401).json({ error: err.message });
    //     }
    //     return res.status(201).json(artist);
    //   });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
});

// fetch artist by id
router.get("/:id", async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(401).json({ message: "Artist Not Availabe!!" });
    }
    return res.status(201).json(artist);
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
});

// delete artist
router.delete("/:id", async (req, res) => {
  try {
    const artist = await Artist.findByIdAndRemove(req.params.id);
    if (!artist) {
      return res.status(401).json({ message: "Artist Not Available!!" });
    }

    if (artist.image != "") {
      try {
        fs.unlinkSync(path.join(__dirname, "../../uploads/" + artist.image));
      } catch (err) {
        console.log(err);
      }
    }

    return res.status(201).json({ message: "Artist Removed!!" });
  } catch (err) {
    console.log(err.message);
    return res.status(401).json({ error: err.message });
  }
});

// add artist
router.post("/", upload, async (req, res) => {
  try {
    const { artistname, biography, artistroles } = req.body;
    const artist = new Artist({
      artistname: artistname,
      image: req.file.filename,
      biography: biography,
      artistrole: artistroles,
    });

    const artistData = await artist.save();
    if (!artistData) {
      return res.status(401).json({ message: "Artist Not Added!!" });
    }
    return res.status(201).json(artistData);
  } catch (err) {
    console.log(err.message);
  }
});

//search artist
// router.post("/search", async (req, res) => {
//   const searchByName = req.query.name;
//   console.log(req.query.name);
//   const artist = await Artist.find({
//     artistname: { $regex: searchByName, $options: "$i" },
//   });

//   if (artist === null) {
//     return res.status(401).json({ message: "Artist Not Found!!" });
//   }
//   return res.status(201).json(artist);
// });

router.get("/search/:key", async (req, res) => {
  const searchByName = req.params.key;
  console.log(searchByName);
  let artist = await Artist.find({
    artistname: { $regex: searchByName, $options: "$i" },
  });
  return res.status(201).json(artist);
});

// router.get("/search/:key", async (req, res) => {
//   const searchByName = req.params.key;
//   console.log(searchByName);
//   let artist = await Artist.find({
//     $or: [{ artistname: { $regex: searchByName, $options: "$i" } }],
//   });
//   return res.status(201).json(artist);
// });

module.exports = router;
