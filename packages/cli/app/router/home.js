'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/dev', controller.dev.index);
  router.get('/open', controller.dev.index);
  router.get('/', controller.dev.index);
};
