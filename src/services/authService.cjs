const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../repositories/userRepository.cjs');
const AppError = require('../utils/AppError.cjs');
const { jwtSecret, jwtExpiresIn, bcryptRounds } = require('../config.cjs');

// Hash palsu agar waktu respons relatif sama walau username tidak ada.
const DUMMY_HASH = bcrypt.hashSync('dummy-password', bcryptRounds);

async function login(username, password) {
  const user = userRepo.findByUsername(username);
  const valid = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);

  // Pesan sama untuk "user tidak ada" dan "password salah" (cegah user enumeration)
  if (!user || !valid) throw new AppError(401, 'Username atau password salah');

  const token = jwt.sign({ role: user.role, name: user.name }, jwtSecret, {
    subject: user.id,
    expiresIn: jwtExpiresIn,
    algorithm: 'HS256',
  });

  return {
    token,
    tokenType: 'Bearer',
    expiresIn: jwtExpiresIn,
    user: { id: user.id, username: user.username, name: user.name, role: user.role },
  };
}

module.exports = { login };