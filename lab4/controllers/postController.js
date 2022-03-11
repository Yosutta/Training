const PostModel = require('../models/postModel')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

module.exports.returnHomePostData = async (req, res) => {
  try {
    const all_posts_data = await PostModel.getAllPosts(req.DBconnection)
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { all_posts_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.returnSinglePostData = async (req, res) => {
  try {
    const post_data = await PostModel.getSinglePost(
      req.DBconnection,
      req.params.id
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { post_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.addNewPost = async (req, res, next) => {
  try {
    const author_id = req.payload.user_id
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
    res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Successfully added a new post' })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.editSinglePostData = async (req, res, next) => {
  try {
    const { new_post_title, new_post_slug, new_post_content } = req.body
    const post_id = req.params.id
    await PostModel.editSinglePost(
      req.DBconnection,
      post_id,
      new_post_title,
      new_post_slug,
      new_post_content
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Successfully edited a post' })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.deleteSinglePost = async (req, res, next) => {
  try {
    const post_id = req.params.id
    await PostModel.deleteSinglePost(req.DBconnection, post_id)
    res
      .status(StatusCodes.OK)
      .json({ messagecode: 'Successfully deleted a post' })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
