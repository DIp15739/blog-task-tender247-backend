const express = require('express')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()

// Post routes
router.get('/', postController.getAllPosts)
router.get('/:id', postController.getPostById)
router.post('/', authMiddleware, postController.createPost)
router.put('/:id', authMiddleware, postController.updatePost)
router.delete('/:id', authMiddleware, postController.deletePost)

// Comment routes
router.get('/:postId/comments', commentController.getCommentsForPost)
router.post('/:postId/comments', commentController.addComment)
router.delete(
  '/comments/:commentId',
  authMiddleware,
  commentController.deleteComment
)

module.exports = router
