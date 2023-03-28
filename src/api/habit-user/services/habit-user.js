'use strict';

/**
 * habit-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::habit-user.habit-user');
