const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const PostModel = require('../models/posts')

router.get('/', verify, async (req,res) => {
    try {
        const post = await PostModel.find();
        res.json(post);
    } catch (error) {
        res.json({message: error})
    }
})
// secific post
router.get('/:postId', verify , async (req,res) => {
    try {
        const postId = await PostModel.findById(req.params.postId);
        res.json(postId);
    } catch (error) {
        res.json({message: error})
    }
})

router.post('/', verify , async (req, res) => {
    const post = new PostModel({
        title: req.body.title,
        description: req.body.description
    })
    try {
        const savePost = await post.save();
        res.json(savePost)
    } catch (error) {
        res.status(500).json({message: error});
    }
})

//delete
router.delete('/:postId', async (req,res) => {
    try {
        const removePost = await PostModel.remove({_id: req.params.postId})
        res.json(removePost);
    } catch (error) {
        res.json({message: error})
    }
})
//update
router.patch('/:postId', async (req,res) => {
    try {
        const updatePost = await PostModel.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title } },
            { $set: {description: req.body.description } },
        )
        res.json(updatePost);
    } catch (error) {
        res.json({message: error})
    }
})

module.exports = router;