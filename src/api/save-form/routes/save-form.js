module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/save-form',
      handler: 'save-form.create',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
