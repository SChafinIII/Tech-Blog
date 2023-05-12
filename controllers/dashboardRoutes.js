const router = require('express').Router();
const { users, post, comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await post.findAll({
      where: {
        userId: req.session.userId,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: users,
            attributes: ['username'],
          },
        },
        {
          model: users,
          attributes: ['username'],
        },
      ],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      posts, 
      loggedIn: true, 
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const dbPostData = await post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'content', 'created_at'],
      include: [
        {
          model: users,
          attributes: ['username'],
        },
        {
          model: comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: users,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!dbPostData) {
      res.status(404).json({ message: 'This id has no post.' });
      return;
    }

    const post = dbPostData.get({ plain: true });
    res.render('edit-post', { 
      post, 
      loggedIn: true, 
      username: req.session.username 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', { 
    username: req.session.username 
  });
});

module.exports = router;

