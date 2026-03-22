const imagekit = require("@imagekit/nodejs");

const Imagekit = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadFile(file) {
const response = await Imagekit.files.upload({
  file,
  fileName: "music"+ Date.now(),
  folder:"spotify/music"
});
return response;
}

module.exports = uploadFile;