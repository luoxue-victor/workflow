'use strict';

class DevController {
  async index({ ctx, next }) {

    ctx.body = {
      http: 'domain',
    };
  }
}

module.exports = DevController;
