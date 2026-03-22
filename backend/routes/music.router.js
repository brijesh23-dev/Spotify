const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const musicController = require("../controllers/music.controller");
const authArtist= require("../middleware/auth.middleware")

router.post('/upload',authArtist,upload.single("music"),musicController.createMusic);
router.post('/album',authArtist,musicController.createAlbum);

module.exports = router;3