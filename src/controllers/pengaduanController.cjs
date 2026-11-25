const service = require('../services/pengaduanService.cjs');
const { ok } = require('../utils/response.cjs');

exports.list = (req, res) => ok(res, 200, 'Daftar pengaduan', service.list(req.user));

exports.getById = (req, res) =>
  ok(res, 200, 'Detail pengaduan', service.getById(req.user, req.params.id));

exports.create = (req, res) =>
  ok(res, 201, 'Pengaduan berhasil dibuat', service.create(req.user, req.body));

exports.update = (req, res) =>
  ok(res, 200, 'Pengaduan berhasil diubah', service.update(req.user, req.params.id, req.body));

exports.updateStatus = (req, res) =>
  ok(res, 200, 'Status pengaduan berhasil diperbarui', service.updateStatus(req.params.id, req.body.status));

exports.remove = (req, res) => {
  service.remove(req.user, req.params.id);
  ok(res, 200, 'Pengaduan berhasil dihapus', null);
};