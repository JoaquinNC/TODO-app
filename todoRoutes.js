const express = require('express');
const router = express.Router();
const todoController = require('./todoController');
router.post('/', todoController.createTodo);
module.exports = router;