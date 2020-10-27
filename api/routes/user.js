const router = require('express').Router();
const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// validation
const {registerValidation, loginValidation} = require('../validation')

router.post('/register', async (req,res) => {

    // LETS VALIDATE DATA
    const {error} = registerValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);

    // check email isset
    const emailExit = await userModel.findOne({email: req.body.email});
    if(emailExit) return res.status(500).send('Email alredy exits')

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(req.body.password, salt);

    // creat a new user
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hasedPassword,
    })
    try {
        const saveUser = await user.save();
        res.json({ user: user._id});
    } catch (error) {
        res.status(500).json({message: error});
    }
})

// login
router.post('/login', async (req, res) => {
    // validation login
    const {error} = loginValidation(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    // check email isset
    const user = await userModel.findOne({email: req.body.email});
    if(!user) return res.status(500).send('Email is not fount');
    // check password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(500).send('Invalid password');

    // create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})

module.exports = router;