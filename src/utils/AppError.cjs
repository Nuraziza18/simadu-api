// Error terkontrol: pesan aman ditampilkan ke client.
class AppError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors; // detail validasi (opsional)
  }
}
module.exports = AppError;