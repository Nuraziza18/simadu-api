const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config.cjs');
const userRepo = require('../repositories/userRepository.cjs');
const AppError = require('../utils/AppError.cjs');

// AUTENTIKASI: "siapa kamu?" -> verifikasi Bearer token
function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    res.set('WWW-Authenticate', 'Bearer');
    throw new AppError(401, 'Token autentikasi tidak ditemukan');
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
  } catch (err) {
    res.set('WWW-Authenticate', 'Bearer');
    throw new AppError(401, err.name === 'TokenExpiredError' ? 'Token telah kedaluwarsa' : 'Token tidak valid');
  }

  const user = userRepo.findById(payload.sub);
  if (!user) {
    res.set('WWW-Authenticate', 'Bearer');
    throw new AppError(401, 'Token tidak valid');
  }

  req.user = { id: user.id, role: user.role, name: user.name };
  next();
}

// OTORISASI: "boleh melakukan apa?" -> cek role
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new AppError(403, 'Anda tidak memiliki izin untuk operasi ini');
  }
  next();
};

module.exports = { authenticate, authorize };