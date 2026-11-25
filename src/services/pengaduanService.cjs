const repo = require('../repositories/pengaduanRepository.cjs');
const AppError = require('../utils/AppError.cjs');

function getOrThrow(id) {
  const item = repo.findById(id);
  if (!item) throw new AppError(404, 'Pengaduan tidak ditemukan');
  return item;
}

// Kepemilikan: hanya pemilik (mahasiswa) yang boleh mengakses/mengubah/menghapus
function assertOwner(user, item) {
  if (item.mahasiswaId !== user.id) {
    throw new AppError(403, 'Anda tidak berhak mengakses pengaduan ini');
  }
}

// Aturan konsistensi: hanya boleh diubah/dihapus selama berstatus "diajukan"
function assertEditable(item) {
  if (item.status !== 'diajukan') {
    throw new AppError(403, 'Pengaduan hanya dapat diubah atau dihapus selama berstatus "diajukan"');
  }
}

module.exports = {
  list(user) {
    return user.role === 'admin' ? repo.findAll() : repo.findByOwner(user.id);
  },

  getById(user, id) {
    const item = getOrThrow(id);
    if (user.role !== 'admin') assertOwner(user, item);
    return item;
  },

  create(user, { judul, kategori, deskripsi }) {
    // mahasiswaId diambil dari token (hasil autentikasi), BUKAN dari body
    return repo.create({ mahasiswaId: user.id, judul, kategori, deskripsi });
  },

  update(user, id, data) {
    const item = getOrThrow(id);
    assertOwner(user, item);
    assertEditable(item);
    return repo.update(id, data);
  },

  updateStatus(id, status) {
    getOrThrow(id);
    return repo.updateStatus(id, status);
  },

  remove(user, id) {
    const item = getOrThrow(id);
    assertOwner(user, item);
    assertEditable(item);
    repo.remove(id);
  },
};