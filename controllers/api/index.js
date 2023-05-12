const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// User routes
router.use('/user', userRoutes);

// Post routes
router.use('/post', postRoutes);

// Comment routes
router.use('/comment', commentRoutes);

module.exports = router;
