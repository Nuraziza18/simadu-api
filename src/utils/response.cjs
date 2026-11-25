// Format respons konsisten untuk seluruh endpoint.
const ok = (res, status, message, data) =>
  res.status(status).json({ success: true, message, data });

module.exports = { ok };