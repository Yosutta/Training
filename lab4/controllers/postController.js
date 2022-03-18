import PostModel from '../models/postModel.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export async function returnHomePostData(req, res) {
  try {
    const allPostsData = await PostModel.getAllPosts(req.DBconnection)
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { allPostsData } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function returnSinglePostData(req, res) {
  try {
    const postData = await PostModel.getSinglePost(
      req.DBconnection,
      req.params.id
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { postData } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function addNewPost(req, res, next) {
  try {
    const authorId = req.payload.userId
    const postCreatedAt = new Date(Date.now()).toISOString().split('T')[0]
    const postPublished = 1
    const { postTitle, postSlug, postContent } = req.body
    await PostModel.addNewPost(
      req.DBconnection,
      authorId,
      postTitle,
      postSlug,
      postPublished,
      postCreatedAt,
      postContent
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

export async function editSinglePostData(req, res, next) {
  try {
    const { postTitle, postSlug, postContent } = req.body
    const postId = req.params.id
    await PostModel.editSinglePost(
      req.DBconnection,
      postId,
      postTitle,
      postSlug,
      postContent
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

export async function deleteSinglePost(req, res, next) {
  try {
    const postId = req.params.id
    await PostModel.deleteSinglePost(req.DBconnection, postId)
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
