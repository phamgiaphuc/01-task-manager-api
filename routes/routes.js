const express = require('express');
const router = express.Router();
const {
     testServerContent,
     getAllTasks,
     createTask,
     getTask,
     updateTask,
     deleteTask,
     editTask
} = require('../controllers/tasks');

router.get('/test', testServerContent);
router.route('/tasks')
     .get(getAllTasks)
     .post(createTask);
router.route('/tasks/:id')
     .get(getTask)
     .patch(updateTask)
     .delete(deleteTask)
     .put(editTask);

module.exports = router;
