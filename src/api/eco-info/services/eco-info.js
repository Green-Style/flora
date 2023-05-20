'use strict';

/**
 * eco-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::eco-info.eco-info');
