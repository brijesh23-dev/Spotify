const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, role = "user" } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const isalreadyRegister = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (isalreadyRegister) {
            return res.status(409).json({
                success: false,
                message: "User already exists with that email or username"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET
        );

        res.cookie('token', token);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            },
        });

    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration",
            error: error.message
        });
    }
}

module.exports.login = async (req, res) => {
    let { username,email,password } = req.body;
    const user = await User.findOne({
        $or: [{username},{email}]
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "invalid credentials"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return res.status(404).json({
            success: false,
            message: "invalid credentials"
        })
    }
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_key)
    res.cookie('token', token);

    res.status(200).json({
        success: true,
        message: "Login successful",
        role:user.role
    })
}
