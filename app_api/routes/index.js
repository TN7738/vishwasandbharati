const express = require('express');
const router = express.Router();
const cntrlCollects = require('../controllers/collect');

// collect items
router
    .route('/collectlist')
    .get(cntrlCollects.collectListAll)
    .post(cntrlCollects.collectListCreate);
router
    .route('/collectlist/:collectid')
    .get(cntrlCollects.collectListReadOne)
    .put(cntrlCollects.collectListUpdateOne)
    .delete(cntrlCollects.collectListDeleteOne);

module.exports = router;