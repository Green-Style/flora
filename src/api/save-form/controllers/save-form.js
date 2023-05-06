'use strict';

/**
 * A set of functions called "actions" for `save-form`
 */

module.exports = {
  create: async (ctx, next) => {
    try {
      //TODO Coletar respostas via BODY do request

      const now = new Date()

      const inputs = [
        {
          question: 3,
          option: 1
        },
        {
          question: 1,
          option: 2
        },
      ]

      const form = await strapi.entityService.create('api::form.form',
        {
          data:
            { date: now, users_permissions_user: ctx.state.user.id, publishedAt: now }
        })

      const result = {
        ...form,
        answers: []
      }

      for (const input of inputs) {
        const answer = await strapi.entityService.create('api::answer.answer',
          {
            data: {
              ...input,
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
