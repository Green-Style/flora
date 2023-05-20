module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/email-pages/confirm-email',
      handler: 'email-pages.confirmedEmail',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/email-pages/forgot-password',
      handler: 'email-pages.forgotPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/email-pages/forgot-password-success',
      handler: 'email-pages.forgotPasswordSuccess',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
