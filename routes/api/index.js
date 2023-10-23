const router = require('express').Router();
const category-routes = require('./category-routes');
const product-routes = require('./productR-routes');
const tag-routes = require('./tag-routes');

router.use('/category-routes', category-routes);
router.use('/product-routes', product-routes);
router.use('/tag-routes', tag-routes);

module.exports = router;
