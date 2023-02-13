"use strict";

/**
 * A set of functions called "actions" for `message`
 */

module.exports = {
  handleMessage: async (ctx, next) => {
    try {
      const { message } = ctx.request.body;

      return ctx.send(message, 200);
    } catch (err) {
      strapi.log.error(err);

      return ctx.badRequest(err);
    }
  },
};
