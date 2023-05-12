const router = require('express').Router();
const { post, users, comment } = require('../models');
const sequelize = require('../config/config');

router.get('/', async (req, res) => {
  try {
    const posts = await post.findAll({
      attributes: ['id', 'title', 'content', 'created_at'],
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
      order: [['created_at', 'DESC']],
    });

    const serializedPosts = posts.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts: serializedPosts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve posts' });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'content', 'title', 'created_at'],
      include: [
        {
          model: comment,
          attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: users,
          attributes: ['username'],
        },
      ],
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const serializedPost = post.get({ plain: true });
    res.render('single-post', {
      post: serializedPost,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve post' });
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;
