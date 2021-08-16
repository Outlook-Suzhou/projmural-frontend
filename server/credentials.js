if(process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync(path.join(__dirname, '../privkey.pem'), 'utf8');
  const certificate = fs.readFileSync(path.join(__dirname, '../fullchain.pem'), 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: certificate,
  };
  module.exports = credentials;
} 