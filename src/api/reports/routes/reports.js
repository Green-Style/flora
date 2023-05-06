module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/report/my-co-two',
      handler: 'reports.myCoInfo',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
