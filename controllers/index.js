const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
