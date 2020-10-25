const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const studentRoutes = require('./student.route');
const wpmRoutes = require('./wpm.route')

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/student', studentRoutes);
router.use('/wpm',wpmRoutes);

module.exports = router;
