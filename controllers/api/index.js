const express = require('express');
const router = express.Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// User routes
router.use('/user', userRoutes);

// Post routes
router.use('/post', postRoutes);

// Comment routes
router.use('/comment', commentRoutes);

module.exports = router;
