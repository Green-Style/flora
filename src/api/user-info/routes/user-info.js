module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/user-info',
      handler: 'user-info.show',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
