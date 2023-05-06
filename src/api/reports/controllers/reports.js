'use strict';

/**
 * A set of functions called "actions" for `reports`
 */

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

      const [{ qtyCo2 }] = await strapi.db.connection.raw(
        `
        SELECT SUM(options.value) AS qtyCo2 FROM answers
          JOIN answers_form_links ON answers_form_links.answer_id = answers.id
          JOIN answers_option_links ON answers_option_links.answer_id = answers.id
          JOIN options ON answers_option_links.option_id = options.id
        WHERE answers_form_links.form_id = ?;
        `, [form.id]
      )

      const qtyCo2perCategory = await strapi.db.connection.raw(
        `
        SELECT 
            categories.id AS id,
            categories.description AS category,
            SUM(options.value) AS qtyCo2
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
      )

      qtyCo2perCategory.forEach(category => {
        category.percentage = Math.round(category.qtyCo2 * 100 / qtyCo2)
      })

      ctx.body = {
        qtyCo2,
        qtyCo2perCategory
      }
    } catch (err) {
      ctx.body = err;
    }
  }
};
