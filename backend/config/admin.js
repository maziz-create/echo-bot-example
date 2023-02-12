module.exports = ({ env }) => ({
  serveAdminPanel: false,
  rateLimit: {
    enabled: false,
  },
  autoOpen: false,
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
});
