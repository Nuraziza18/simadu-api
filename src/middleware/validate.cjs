const AppError = require('../utils/AppError.cjs');

/**
 * Validasi body berdasarkan aturan field.
 * rules = { namaField: { required, min, max, oneOf, noTrim } }  (semua bertipe string)
 * - Menolak body yang bukan objek JSON
 * - Menolak field yang tidak ada di rules (mis. id, mahasiswaId, status, createdAt)
 */
function validateBody(rules) {
  return (req, res, next) => {
    const body = req.body;
    if (body === undefined || body === null || typeof body !== 'object' || Array.isArray(body)) {
      throw new AppError(400, 'Body request harus berupa objek JSON (Content-Type: application/json)');
    }

    const errors = [];
    for (const key of Object.keys(body)) {
      if (!Object.hasOwn(rules, key)) errors.push({ field: key, message: 'Field tidak diperbolehkan' });
    }

    const clean = {};
    for (const [field, rule] of Object.entries(rules)) {
      const value = body[field];
      if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
        if (rule.required) errors.push({ field, message: 'Wajib diisi' });
        continue;
      }
      if (typeof value !== 'string') {
        errors.push({ field, message: 'Harus berupa string' });
        continue;
      }
      const v = rule.noTrim ? value : value.trim();
      if (rule.min && v.length < rule.min) errors.push({ field, message: `Minimal ${rule.min} karakter` });
      else if (rule.max && v.length > rule.max) errors.push({ field, message: `Maksimal ${rule.max} karakter` });
      else if (rule.oneOf && !rule.oneOf.includes(v)) errors.push({ field, message: `Harus salah satu dari: ${rule.oneOf.join(', ')}` });
      else clean[field] = v;
    }

    if (errors.length) throw new AppError(400, 'Validasi gagal', errors);
    req.body = clean;
    next();
  };
}

// Validasi parameter :id harus bilangan bulat positif
function validateIdParam(req, res, next) {
  if (!/^[1-9]\d*$/.test(req.params.id)) {
    throw new AppError(400, 'Parameter id harus berupa bilangan bulat positif');
  }
  req.params.id = Number(req.params.id);
  next();
}

module.exports = { validateBody, validateIdParam };