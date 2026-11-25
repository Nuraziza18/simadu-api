const app = require('./app.cjs');
const { port } = require('./src/config.cjs');

app.listen(port, () => {
  console.log(`SIMADU API berjalan di http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});