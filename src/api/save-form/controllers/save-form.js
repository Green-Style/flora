'use strict';

/**
 * A set of functions called "actions" for `save-form`
 */

module.exports = {
  create: async (ctx, next) => {
    try {
      const { body: answersInput } = ctx.request

      const now = new Date()


      const form = await strapi.entityService.create('api::form.form',
        {
          data:
            { date: now, users_permissions_user: ctx.state.user.id, publishedAt: now }
        })

      const result = {
        ...form,
        answers: []
      }

      for (const answerInput of answersInput) {
        const answer = await strapi.entityService.create('api::answer.answer',
          {
            data: {
              ...answerInput,
              form: form.id,
              publishedAt: now
            }
          })

        result.answers.push(answer)

      }
      ctx.body = result;
    } catch (err) {
      ctx.body = err;
    }
  }
};
