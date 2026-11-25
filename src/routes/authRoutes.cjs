const { Router } = require('express');
const { validateBody } = require('../middleware/validate.cjs');
const controller = require('../controllers/authController.cjs');

const router = Router();

router.post(
  '/login',
  validateBody({
    username: { required: true, max: 50 },
    password: { required: true, max: 100, noTrim: true },
  }),
  controller.login
);

module.exports = router;