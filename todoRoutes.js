const express = require('express');
const router = express.Router();
const todoController = require('./todoController');

router.get('/', todoController.getItems);
router.post('/', todoController.createItem);
router.post('/delete', todoController.deleteItem);

module.exports = router;
