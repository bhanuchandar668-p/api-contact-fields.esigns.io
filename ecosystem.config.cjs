module.exports = {
  apps: [
    {
      name: "api-contact-fields-esigns-io",
      script: "npm",
      args: "run start",
      exec_mode: "fork",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        TZ: "utc",
        NODE_ENV: "dev",
      },
    },
  ],
};