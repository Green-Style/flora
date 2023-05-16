'use strict';

/**
 * A set of functions called "actions" for `reports`
 */

async function calcQtyCo2ByFormId(formId) {
  const [{ qtyCo2 }] = (await strapi.db.connection.raw(
    `
    SELECT SUM(options.value) AS "qtyCo2" FROM answers
      JOIN answers_form_links ON answers_form_links.answer_id = answers.id
      JOIN answers_option_links ON answers_option_links.answer_id = answers.id
      JOIN options ON answers_option_links.option_id = options.id
    WHERE answers_form_links.form_id = ?;
    `, [formId]
  )).rows

  return qtyCo2
}

module.exports = {
  myCoInfo: async (ctx, next) => {
    try {
      const [form] = await strapi.entityService.findMany(
        'api::form.form',
        {
          filters: {
            users_permissions_user: ctx.state.user.id
          },
          fields: "id",
          limit: 1,
          sort: { id: 'desc' }
        }
      );

      const qtyCo2 = await calcQtyCo2ByFormId(form.id)

      const qtyCo2perCategory = (await strapi.db.connection.raw(
        `
        SELECT 
            categories.id AS id,
            categories.description AS category,
            SUM(options.value) AS "qtyCo2"
        FROM answers
          JOIN answers_form_links ON answers_form_links.answer_id = answers.id
          JOIN answers_option_links ON answers_option_links.answer_id = answers.id
          JOIN options ON options.id = answers_option_links.option_id
          JOIN options_habit_links ON options_habit_links.option_id = options.id
          JOIN habits ON habits.id = options_habit_links.habit_id
          JOIN habits_category_links ON habits_category_links.habit_id = habits.id
          JOIN categories on categories.id = habits_category_links.category_id
        WHERE answers_form_links.form_id = ?
        GROUP BY categories.id;
        `, [form.id]
      )).rows

      qtyCo2perCategory.forEach(category => {
        category.percentage = Math.round(category.qtyCo2 * 100 / qtyCo2)
      })

      const [{ suggestion }] = (await strapi.db.connection.raw(
        `
        SELECT 
          suggestions.description  AS suggestion
        FROM answers
          JOIN answers_form_links ON answers_form_links.answer_id = answers.id
          JOIN answers_option_links ON answers_option_links.answer_id = answers.id
          JOIN options ON options.id = answers_option_links.option_id
          JOIN options_habit_links ON options_habit_links.option_id = options.id
          JOIN suggestions_habit_links ON suggestions_habit_links.habit_id = options_habit_links.habit_id
          JOIN suggestions ON suggestions.id = suggestions_habit_links.suggestion_id
        WHERE answers_form_links.form_id = ?
        ORDER BY RANDOM()
        LIMIT 1;
        `, [form.id]
      )).rows

      ctx.body = {
        suggestion,
        qtyCo2,
        qtyCo2perCategory
      }
    } catch (err) {
      ctx.body = err;
    }
  },

  compareCo: async (ctx, next) => {
    try {
      const [firstForm] = await strapi.entityService.findMany(
        'api::form.form',
        {
          filters: {
            users_permissions_user: ctx.state.user.id
          },
          fields: "id",
          limit: 1,
          sort: { id: 'asc' }
        }
      );

      const [lastForm] = await strapi.entityService.findMany(
        'api::form.form',
        {
          filters: {
            users_permissions_user: ctx.state.user.id
          },
          fields: "id",
          limit: 1,
          sort: { id: 'desc' }
        }
      );

      const firstQtyCo2 = await calcQtyCo2ByFormId(firstForm.id)

      const lastQtyCo2 = await calcQtyCo2ByFormId(lastForm.id)


      ctx.body = {
        globalQtyCo2: 300,
        firstQtyCo2: firstQtyCo2 || 0,
        lastQtyCo2: lastQtyCo2 || 0
      }
    } catch (err) {
      ctx.body = err;
    }
  }
};
