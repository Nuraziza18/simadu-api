// Penyimpanan in-memory. Semua fungsi mengembalikan salinan agar data internal aman.
let nextId = 1;
const items = [];

const clone = (x) => (x ? { ...x } : null);

function create({ mahasiswaId, judul, kategori, deskripsi }) {
  const item = {
    id: nextId++,
    mahasiswaId,
    judul,
    kategori,
    deskripsi,
    status: 'diajukan',
    createdAt: new Date().toISOString(),
  };
  items.push(item);
  return clone(item);
}

// Data awal
create({ mahasiswaId: '2024001', judul: 'AC ruang kuliah rusak', kategori: 'Fasilitas', deskripsi: 'AC di ruang B-203 tidak dingin sejak minggu lalu.' });
create({ mahasiswaId: '2024001', judul: 'Wi-Fi kampus lambat', kategori: 'TI', deskripsi: 'Koneksi Wi-Fi di perpustakaan sering terputus.' });
create({ mahasiswaId: '2024002', judul: 'Nilai belum muncul', kategori: 'Akademik', deskripsi: 'Nilai mata kuliah Basis Data belum tampil di portal.' });

module.exports = {
  create,
  findAll: () => items.map(clone),
  findByOwner: (mahasiswaId) => items.filter((i) => i.mahasiswaId === mahasiswaId).map(clone),
  findById: (id) => clone(items.find((i) => i.id === id)),
  update(id, { judul, kategori, deskripsi }) {
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    Object.assign(item, { judul, kategori, deskripsi });
    return clone(item);
  },
  updateStatus(id, status) {
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    item.status = status;
    return clone(item);
  },
  remove(id) {
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  },
};