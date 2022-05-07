const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register/index.html'),
        login: resolve(__dirname, 'login/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        'admin/login': resolve(__dirname, 'admin/login/index.html'),
        'admin/user': resolve(__dirname, 'admin/users/index.html'),
        'admin/broadcast': resolve(__dirname, 'admin/broadcasts/index.html'),
      },
    },
  },
});
