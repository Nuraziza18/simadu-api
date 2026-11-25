const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./docs/openapi.json');
const authRoutes = require('./src/routes/authRoutes.cjs');
const pengaduanRoutes = require('./src/routes/pengaduanRoutes.cjs');
const { notFound, errorHandler } = require('./src/middleware/errorHandler.cjs');

const app = express();

// Swagger UI dipasang sebelum helmet agar skrip inline Swagger tidak diblokir CSP
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use(helmet());
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) =>
  res.json({ success: true, message: 'SIMADU API berjalan', data: null })
);
app.use('/api/auth', authRoutes);
app.use('/api/pengaduan', pengaduanRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;