'use strict';

/**
 * A set of functions called "actions" for `random-eco-infos`
 */

async function findRandomInfosByCategoryId(categoryId) {
  const QTY_INFOS_PER_CATEGORY = 1

  const ecoInfos = (
    await strapi.db.connection.raw(
      `
      SELECT 
          eco_infos.id AS id,
          eco_infos.description AS description,
          eco_infos_category_links.category_id AS category_id
      FROM eco_infos
        JOIN eco_infos_category_links ON eco_infos_category_links.eco_info_id = eco_infos.id
      WHERE eco_infos_category_links.category_id = ?
      ORDER BY RANDOM()
      LIMIT ?;
      `, [categoryId, QTY_INFOS_PER_CATEGORY]
    )
  ).rows

  return ecoInfos
}

module.exports = {
  list: async (ctx, next) => {
    try {
      let ecoInfos = []

      const categories = await strapi.entityService.findMany(
        "api::category.category",
        {
          fields: ['id']
        }
      )

      for (const category of categories) {
        ecoInfos = ecoInfos.concat(await findRandomInfosByCategoryId(category.id))
      }

      ctx.body = ecoInfos
    } catch (err) {
      ctx.body = err;
    }
  }
};
