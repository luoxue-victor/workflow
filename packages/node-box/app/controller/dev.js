'use strict';

class DevController {
  async index({ ctx, next }) {

    ctx.body = {
      http: '123111',
    };
  }
}

module.exports = DevController;
