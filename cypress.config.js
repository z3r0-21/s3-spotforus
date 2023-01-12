const { defineConfig } = require("cypress");

// dotenv.config({ path: ".env.local" });
// dotenv.config();

module.exports = defineConfig({
  env: {
    auth0_username: "cypress",
    auth0_password: "Test-123$",
    auth0_domain: "spotforus-auth.eu.auth0.com",
    auth0_audience: "https://spotforus-auth.eu.auth0.com/api/v2/",
    auth0_scope: "openid email profile",
    auth0_client_id: "6zynGUG0iL3qVdBgexomDL9vlPUYkCcQ",
    auth0_client_secret: "zZuHtX7w6uBuekDKo_eO9Lwi9eOXcJQwheVd4W7RN3C2S97IRQheWP5mEaeudp16"
  }
})

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
