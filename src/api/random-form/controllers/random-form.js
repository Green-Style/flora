'use strict';

/**
 * A set of functions called "actions" for `random-form`
 */

async function findRandomQuestionsByCategoryId(categoryId) {
  const QTY_QUESTIONS_PER_CATEGORY = 5

  const questionsIds = (
    await strapi.db.connection.raw(
      `
      SELECT 
          questions.id AS id
      FROM questions
        JOIN questions_category_links ON questions_category_links.question_id = questions.id
        JOIN options_question_links ON options_question_links.question_id = questions.id
      WHERE questions_category_links.category_id = ?
      ORDER BY RANDOM()
      LIMIT ?;
      `, [categoryId, QTY_QUESTIONS_PER_CATEGORY]
    )
  ).map(question => question.id)

  const questions = await strapi.entityService.findMany(
    "api::question.question",
    {
      filters: {
        id: { $in: questionsIds }
      },
      populate: ['options', 'category']
    }
  );

  return questions
}

module.exports = {
  list: async (ctx, next) => {
    try {
      let questions = []

      const categories = await strapi.entityService.findMany(
        "api::category.category",
        {
          fields: ['id']
        }
      )

      for (const category of categories) {
        questions = questions.concat(await findRandomQuestionsByCategoryId(category.id))
      }

      ctx.body = questions
    } catch (err) {
      ctx.body = err;
    }
  }
};
