const router = require('express').Router();
const { users, post, comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a new post ('/api/post')
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await post.create({ ...req.body, userId: req.session.userId });
    console.log('This is the new post', newPost);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update post ('/api/post/:id')
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [rowsAffected, [updatedPost]] = await post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        returning: true,
        where: {
          id: req.params.id,
          userId: req.session.userId,
        },
      }
    );
    if (!rowsAffected) {
      res.status(404).json({ message: 'This id has no post' });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post ('/api/post/:id')
router.delete('/:id', withAuth, async (req, res) => {
  try {
    await Comment.destroy({
      where: { postId: req.params.id },
    });

    const rowsAffected = await post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });
    if (!rowsAffected) {
      res.status(404).json({
        message: `No post was found with id = ${req.params.id} and userId = ${req.session.userId}`,
      });
      return;
    }
    res.status(200).json(rowsAffected);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
