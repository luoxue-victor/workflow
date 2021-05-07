'use strict';

class HomeController {
  async one({ ctx, next }) {

    ctx.body = {
      content: 'one',
    };
  }

  async two({ ctx, next }) {

    ctx.body = {
      content: 'two',
    };
  }
}

module.exports = HomeController;
