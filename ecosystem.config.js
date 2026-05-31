module.exports = {
  apps: [
    {
      name: 'backend1',
      script: 'nodemon',
      args: '--watch ./ app.js',
      env_file: '.env.backend1',
    },
    {
      name: 'backend2',
      script: 'nodemon',
      args: '--watch ./ app.js',
      env_file: '.env.backend2',
    },
  ],
};