const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const {
    showallTasks,
    addnewTask,
    deleteTasks,
    completeTask,
    updateTask,
    editTask,
} = require("../controller/task.controller");

// Show all tasks 
router.get('/', isAuthenticated, showallTasks);

// Add a new task 
router.post('/', isAuthenticated, addnewTask);

// Delete a task 
router.post('/:id/delete', isAuthenticated, deleteTasks);

// Toggle task completion  
router.post('/:id/toggle', isAuthenticated, completeTask);

// Show edit form 
router.get('/:id/edit', isAuthenticated, editTask);

// Update task 
router.post('/:id/edit', isAuthenticated, updateTask);

module.exports = router;
