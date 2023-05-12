const express = require('express');
const router = express.Router();
const { comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
  try{ 
    const comments = await comment.findAll({});
    if (comments.length === 0) {
      res.status(404).json({ message: "No comments found."});
      return;
    };
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await comment.findAll({
      where: { post_id: req.params.postId },
    });
    if (comments.length === 0) {
      res.status(404).json({ message: `No comments found for post with id ${req.params.postId}.` });
      return;
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const comment = await comment.create({
      ...req.body,
      userId: req.session.userId,
    });
    res.status(201).json({ comment, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const result = await comment.destroy({
      where: { id: req.params.id },
    });
    if (!result) {
      res.status(404).json({
        message: `No comment found with id ${req.params.id}`,
      });
      return;
    }  
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

