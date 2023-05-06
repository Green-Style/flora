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
    {
      method: 'GET',
      path: '/report/compare-co-two',
      handler: 'reports.compareCo',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
