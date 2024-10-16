const Joi = require('joi')
const { Comment, Post } = require('../../database/connection')
const { successResponse } = require('../middlewares/errorMiddleware')

const commentSchema = Joi.object({
  content: Joi.string().required(),
})

exports.getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId, isDeleted: false },
    })
    successResponse(res, comments)
  } catch (err) {
    next(err)
  }
}

exports.addComment = async (req, res, next) => {
  const { error } = commentSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const post = await Post.findByPk(req.params.postId)
    if (!post) return res.status(404).json({ message: 'Post not found' })

    const comment = await Comment.create({
      ...req.body,
      postId: post.id,
      userId: post.userId,
      isDeleted: false,
    })
    successResponse(res, comment, 'Comment added successfully')
  } catch (err) {
    next(err)
  }
}

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.commentId)
    if (!comment || comment.isDeleted) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    await comment.update({ isDeleted: true })
    successResponse(res, null, 'Comment deleted successfully')
  } catch (err) {
    next(err)
  }
}
