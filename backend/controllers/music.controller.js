const musicModel = require('../models/music.model');
const albumModel = require("../models/album.model");
const uploadFile = require('../services/strorage.service')
const jwt = require("jsonwebtoken")

module.exports.createMusic = async (req, res) => {
    let { title } = req.body;
    let file = req.file
    const result = await uploadFile(file.buffer.toString('base64'));

    const music = new musicModel({
        uri: result.url,
        title,
        artist: decoded.id
    });
    await music.save();
    res.status(201).json({
        message: "file uploaded successfully",
        music
    })
}

module.exports.createAlbum = async (req, res) => {
    let { title, musics } = req.body;
    const album = new albumModel({
        title,
        artist: decoded.id,
        musics: musics
    })
    await album.save();

    res.status(201).json({
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics
    });
}

