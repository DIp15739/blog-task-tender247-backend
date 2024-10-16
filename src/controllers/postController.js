const Joi = require('joi')
const { User, Post, Comment } = require('../../database/connection')
const { Op } = require('sequelize')
const {
  successResponse,
  errorHandler,
} = require('../middlewares/errorMiddleware')

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
})

exports.getAllPosts = async (req, res, next) => {
  const { search, page = 1, limit = 10, username } = req.query
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10)

  try {
    const whereClause = { isDeleted: false }
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` }
    }
    if (username) {
      const user = await User.findOne({ where: { username } })
      if (user) whereClause.userId = user.id
    }

    const posts = await Post.findAll({
      where: whereClause,
      include: [
        { model: User, attributes: ['username'], as: 'author' },
        { model: Comment, as: 'comments' },
      ],
      limit: parseInt(limit, 10),
      offset,
    })

    if (posts.length === 0) {
      return successResponse(res, [], 'No posts found matching your criteria.')
    }

    successResponse(res, posts)
  } catch (err) {
    next(err)
  }
}

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id, isDeleted: false },
      include: [
        { model: User, attributes: ['username'], as: 'author' },
        {
          model: Comment,
          as: 'comments',
          where: { isDeleted: false },
          required: false,
        },
      ],
    })

    if (!post)
      return errorHandler(
        { statusCode: 404, message: 'Post not found' },
        '',
        res
      )

    successResponse(res, post)
  } catch (err) {
    next(err)
  }
}

exports.createPost = async (req, res, next) => {
  const { error } = postSchema.validate(req.body)
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const post = await Post.create({
      ...req.body,
      userId: req.user.id,
      isDeleted: false,
    })
    successResponse(res, post, 'Post created successfully')
  } catch (err) {
    next(err)
  }
}

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post || post.isDeleted) {
      return errorHandler(
        { statusCode: 404, message: 'Post not found' },
        '',
        res
      )
    }
    if (post.userId !== req.user.id) {
      return errorHandler(
        { statusCode: 403, message: 'Unauthorized to edit this post' },
        '',
        res
      )
    }
    await post.update(req.body)
    successResponse(res, post, 'Post updated successfully')
  } catch (err) {
    next(err)
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id)
    if (!post || post.isDeleted) {
      return errorHandler(
        { statusCode: 404, message: 'Post not found' },
        '',
        res
      )
    }
    if (post.userId !== req.user.id) {
      return errorHandler(
        { statusCode: 403, message: 'Unauthorized to edit this post' },
        '',
        res
      )
    }
    await post.update({ isDeleted: true })
    successResponse(res, null, 'Post deleted successfully')
  } catch (err) {
    next(err)
  }
}
