const { Router } = require('express');
const { authenticate, authorize } = require('../middleware/auth.cjs');
const { validateBody, validateIdParam } = require('../middleware/validate.cjs');
const controller = require('../controllers/pengaduanController.cjs');

const router = Router();

const KATEGORI = ['Fasilitas', 'Akademik', 'TI'];
const STATUS = ['diajukan', 'diproses', 'selesai'];

const pengaduanRules = {
  judul: { required: true, min: 5, max: 100 },
  kategori: { required: true, oneOf: KATEGORI },
  deskripsi: { required: true, min: 10, max: 1000 },
};

// Semua endpoint di bawah ini WAJIB login (Bearer token)
router.use(authenticate);

router.get('/', controller.list); // difilter berdasarkan role di service
router.get('/:id', validateIdParam, controller.getById);
router.post('/', authorize('mahasiswa'), validateBody(pengaduanRules), controller.create);
router.put('/:id', authorize('mahasiswa'), validateIdParam, validateBody(pengaduanRules), controller.update);
router.patch(
  '/:id/status',
  authorize('admin'),
  validateIdParam,
  validateBody({ status: { required: true, oneOf: STATUS } }),
  controller.updateStatus
);
router.delete('/:id', authorize('mahasiswa'), validateIdParam, controller.remove);

module.exports = router;