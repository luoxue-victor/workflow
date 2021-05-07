'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/one', controller.home.one);
  router.get('/two', controller.home.two);
  router.get('/');
};
