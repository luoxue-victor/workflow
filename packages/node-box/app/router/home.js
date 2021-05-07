'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/info', controller.home.getApiInfo);
  router.get('/', controller.home.getApiInfo);
};
