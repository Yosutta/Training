const PostModel = require('../models/postModel')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

module.exports.returnHomePostData = async (req, res) => {
  try {
    const all_posts_data = await PostModel.getAllPosts(req.DBconnection)
    res.status(StatusCodes.OK).json(all_posts_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.returnSinglePostData = async (req, res) => {
  try {
    const post_data = await PostModel.getSinglePost(req.DBconnection, req.params.id)
    res.status(StatusCodes.OK).json(post_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.redirectHomePost = (req, res) => {
  res.redirect('/post')
}

module.exports.addNewPost = async (req, res, next) => {
  const author_id = 1
  const post_created_at = new Date(Date.now()).toISOString().split('T')[0]
  const post_published = 1
  const { post_title, post_slug, post_content } = req.body
  await PostModel.addNewPost(
    req.DBconnection,
    author_id,
    post_title,
    post_slug,
    post_published,
    post_created_at,
    post_content
  )
  next()
}

module.exports.editSinglePostData = async (req, res, next) => {
  const { new_post_title, new_post_slug, new_post_content } = req.body
  const post_id = req.params.id
  try {
    await PostModel.editSinglePost(req.DBconnection, post_id, new_post_title, new_post_slug, new_post_content)
    next()
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.deleteSinglePost = async (req, res, next) => {
  const post_id = req.params.id
  try {
    await PostModel.deleteSinglePost(req.DBconnection, post_id)
    next()
  } catch {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }
}
