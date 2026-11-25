const AppError = require('../utils/AppError.cjs');

function notFound(req, res, next) {
  next(new AppError(404, 'Endpoint tidak ditemukan'));
}

// Error handler terpusat (4 argumen wajib agar dikenali Express)
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  // JSON rusak dari express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Format JSON tidak valid' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Ukuran body terlalu besar' });
  }

  if (err instanceof AppError) {
    const body = { success: false, message: err.message };
    if (err.errors) body.errors = err.errors;
    return res.status(err.status).json(body);
  }

  // Error tak terduga: catat pesan di server, JANGAN bocorkan detail ke client
  if (process.env.NODE_ENV !== 'test') console.error('[ERROR]', err.message);
  res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
}

module.exports = { notFound, errorHandler };