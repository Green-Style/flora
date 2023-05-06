module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/random-form',
      handler: 'random-form.list',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
