'use strict';

/**
 * A set of functions called actions for `user-info`
 */

module.exports = {
  show: async (ctx, next) => {
    try {
      const { id, username, email } = ctx.state.user

      const [form] = await strapi.entityService.findMany(
        'api::form.form',
        {
          filters: {
            users_permissions_user: ctx.state.user.id
          },
          fields: "id",
          limit: 1,
        }
      );

      const response = {
        id, username, email,
        answeredLeastOneForm: !!form
      }

      ctx.body = response;
    } catch (err) {
      ctx.body = err;
    }
  }
};
