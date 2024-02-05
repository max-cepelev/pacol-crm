module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
