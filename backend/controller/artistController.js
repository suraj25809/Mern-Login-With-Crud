const fs = require("fs");
const path = require("path");

// artist model import
const Artist = require("../models/artistModel");

const fetchAllArtist = async (req, res) => {
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
};

const fetchArtsitById = async (req, res) => {
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
};

const deleteArtistById = async (req, res) => {
  console.log("delete operation");
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
};

const addArtist = async (req, res) => {
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
};

const searchArtist = async (req, res) => {
  const searchByName = req.params.key;
  console.log(searchByName);
  let artist = await Artist.find({
    artistname: { $regex: searchByName, $options: "$i" },
  });
  return res.status(201).json(artist);
};

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

// router.get("/search/:key", async (req, res) => {
//   const searchByName = req.params.key;
//   console.log(searchByName);
//   let artist = await Artist.find({
//     $or: [{ artistname: { $regex: searchByName, $options: "$i" } }],
//   });
//   return res.status(201).json(artist);
// });

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

module.exports = {
  fetchAllArtist,
  fetchArtsitById,
  deleteArtistById,
  addArtist,
  searchArtist,
};
