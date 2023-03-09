const Posts = require('../models/postModel'); 
const asyncHandler = require('express-async-handler');

const postCreation = asyncHandler(async (req, res) => {
  try {
    const { title, tags, imageUrl, text } = req.body;
    const createPost = await Posts.create({title:title,tags:tags,imageUrl:imageUrl,text:text, user: req.userId})
    console.log({ createPost });
    res.status(200).json(createPost);
  } catch (error) {
       throw new Error(`post wasnt added!`);
    }
})

const findPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const fPost = await Posts.findByIdAndUpdate({ _id: id }, { $inc: { viewsCount: 1 } }, {new: true});
    res.json({ msg: `post was found succesfully:`, fPost });
  } catch (error) {
    throw new error('post doesnt found')
  }
});

const allPosts = asyncHandler(async (req, res) => {
  try {
    //ref id post -> id user -> user data
    const allP = await Posts.find().populate('user').exec();
    res.json({ msg: `all posts:`, allP })
  } catch (error) {
    throw new error(`something wrong check DB`)
  }
});

const updPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const upPost = await Posts.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true });
    res.json({ msg: `post with ${upPost.title} was updated`, upPost });
  } catch (error) {
    throw new error(`post wasnt updated`)
  }
});

const delPost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const dPost = await Posts.findByIdAndDelete({ _id: id });
    res.json({ msg: 'post was deleted succesfully', dPost });
  } catch (error) {
    throw new error(`problem with post - wasnt deleted`)
  }
})

module.exports = { postCreation, findPost, allPosts, updPost, delPost}