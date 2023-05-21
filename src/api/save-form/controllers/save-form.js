'use strict';

/**
 * A set of functions called "actions" for `save-form`
 */

async function isValidAnswers(answers) {

  if (!answers.length) {
    return false
  }
  let query = `
            SELECT 
                COUNT(options_question_links.id) AS qty
            FROM options_question_links
            WHERE
            `

  let queryData = []

  for (const [index, answer] of answers.entries()) {

    if (index !== 0) {
      query += 'OR '
    }

    query += '(option_id = ? AND question_id = ?) '
    queryData = [...queryData, answer.option, answer.question]
  }

  query += ';'

  const [{ qty }] = (await strapi.db.connection.raw(
    query, queryData
  )).rows

  return Number(qty) === answers.length
}



module.exports = {
  create: async (ctx, next) => {
    try {
      const { body: answersInput } = ctx.request

      if (!(await isValidAnswers(answersInput))) {
        return ctx.badRequest('option not found inside question')
      }

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
