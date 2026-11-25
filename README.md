# SIMADU API

REST API Sistem Layanan Informasi dan Pengaduan Mahasiswa
UTS Web Service Engineering 20261 — Nama: ........ | NIM: ........ | Kelas: ........

Node.js + Express 5, autentikasi Bearer Token (JWT), password di-hash (bcrypt), dokumentasi OpenAPI + Swagger UI.

## Prasyarat
- Node.js 18 atau lebih baru
- npm
- Postman atau VS Code + ekstensi REST Client (untuk pengujian manual)

## Instalasi
```bash
git clone <url-repository>
cd simadu-api
npm install
```

## Konfigurasi
Salin `.env.example` menjadi `.env` (Windows: `copy .env.example .env`), lalu ganti `JWT_SECRET`
dengan string acak minimal 16 karakter.

| Variabel | Fungsi | Default |
|---|---|---|
| PORT | Port server | 3000 |
| JWT_SECRET | Kunci tanda tangan token (wajib) | - |
| JWT_EXPIRES_IN | Masa berlaku token | 15m |
| BCRYPT_ROUNDS | Cost hashing password | 10 |

## Menjalankan server
```bash
npm start       # menjalankan server
npm run dev     # auto-reload saat kode berubah
npm test        # pengujian otomatis
```
- API: http://localhost:3000
- Swagger UI: http://localhost:3000/api-docs
- Health check: http://localhost:3000/api/health

## Akun uji (hanya untuk pengembangan)
| Role | username | password | id |
|---|---|---|---|
| mahasiswa | budi | Budi#12345 | 2024001 |
| mahasiswa | siti | Siti#12345 | 2024002 |
| admin | admin | Admin#12345 | ADM001 |

## Autentikasi
1. `POST