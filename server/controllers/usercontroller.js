const { UniqueConstraintError } = require("sequelize/lib/errors");
const router = require("express").Router();
const { UserModel } = require("../models");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", async (req,res) => {

    let { email, password } = req.body.user;
    try {
        const User = await UserModel.create({
            email,
            password
        });

    let token = jwt.sign({id: User.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});

        res.status(201).json({
            message: "User successfully registered",
            user: User,
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
        
            res.status(500).json({
                message: "Failed to register user",
            });
        }
    };
});

router.post("/login", async (req,res) => {
    let {email, password} = req.body.user;
    try {
    const loginUser = await UserModel.findOne({
        where: {
            email: email,
        },
    });

    let token = jwt.sign({id: loginUser.id}, "i_am_secret", {expiresIn: 60 * 60 * 24});

    if (loginUser) {
    res.status(200).json({
        message: "User successfully logged in",
        user: loginUser,
        sessionToken: token
    });
    } else {
        res.status(401).json({
            message: "login failed"
        });
    } 
    } catch (err) {
        res.status(500).json({
            message: "Failed to login",
        })
    }
});

module.exports = router;