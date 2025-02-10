module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "start",
      cwd: "/app",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
