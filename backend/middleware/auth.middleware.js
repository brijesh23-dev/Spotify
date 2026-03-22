const jwt = require("jsonwebtoken")

const authArtist = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: " unautherised" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: " you don't have permission to create music" })
        }
        next();
    } catch (err) {
        res.status(401).json({message:"unautherized"})
    }
}

module.exports = authArtist;