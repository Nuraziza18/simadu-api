const bcrypt = require('bcryptjs');
const { bcryptRounds } = require('../config.cjs');

// Data uji: 2 mahasiswa + 1 admin. Password DISIMPAN DALAM BENTUK HASH.
const users = [
  { id: '2024001', username: 'budi',  name: 'Budi Santoso',  role: 'mahasiswa', passwordHash: bcrypt.hashSync('Budi#12345', bcryptRounds) },
  { id: '2024002', username: 'siti',  name: 'Siti Aminah',   role: 'mahasiswa', passwordHash: bcrypt.hashSync('Siti#12345', bcryptRounds) },
  { id: 'ADM001',  username: 'admin', name: 'Administrator', role: 'admin',     passwordHash: bcrypt.hashSync('Admin#12345', bcryptRounds) },
];

module.exports = {
  findByUsername: (username) => users.find((u) => u.username === username) || null,
  findById: (id) => users.find((u) => u.id === id) || null,
};