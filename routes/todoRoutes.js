const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/list', todoController.getItems);
router.post('/', todoController.createItem);
router.post('/delete', todoController.deleteItem);
router.post('/complete', todoController.completeItem);

module.exports = router;