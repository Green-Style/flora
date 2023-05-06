'use strict';

/**
 * A set of functions called "actions" for `random-form`
 */

module.exports = {
  list: async (ctx, next) => {
    try {
      //TODO implementar a busca Random
      const entries = await strapi.entityService.findMany(
        "api::question.question",
        {
          // fields: ["id", "text"],
          // fields: ["id", "title", "slug", "createdAt"],
          populate: ['options']
          // {
          //   option: true
          //   // category: {
          //   //   fields: ["name"],
          //   // },
          // },
        }
      );

      console.log(entries)

      ctx.body = entries;
    } catch (err) {
      ctx.body = err;
    }
  }
};
