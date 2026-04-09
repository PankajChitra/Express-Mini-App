import('./Backend/server.js').catch((error) => {
  console.error(error);
  process.exit(1);
});