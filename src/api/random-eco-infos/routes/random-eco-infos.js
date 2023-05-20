module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/random-eco-infos',
      handler: 'random-eco-infos.list',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
