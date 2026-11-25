const authService = require('../services/authService.cjs');
const { ok } = require('../utils/response.cjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  ok(res, 200, 'Login berhasil', result);
};