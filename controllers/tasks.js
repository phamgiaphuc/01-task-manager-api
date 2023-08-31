const port = process.env.PORT || 8000;
const Task = require('../models/model');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const testServerContent = (req, res) => {
     res.send({
          "server": {
               "response": `Server is listening on port ${port}...`,
               "status codes": 200
          }
     });
}

const getAllTasks = asyncWrapper(async (req, res) => {
     const tasks = await Task.find({});
     res.status(200).json({tasks});
})

const createTask = asyncWrapper(async (req, res) => {
     const task = await Task.create(req.body);
     res.status(200).json({task});
})

const getTask = asyncWrapper(async (req, res, next) => {
     const {id:taskID} = req.params;
     const task = await Task.findOne({_id:taskID})
     if (!task) {
          return next(createCustomError(`No task with id : ${taskID}`, 404))
     }
     res.status(200).json({task});
})

const updateTask = async (req, res, next) => {
     const {id:taskID} = req.params;
     const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
          new: true,
          runValidators: true,
     });
     if (!task) {
          return next(createCustomError(`No task with id : ${taskID}`, 404))
     }
     res.status(200).json({task});
}

const deleteTask = asyncWrapper(async (req, res, next) => {
     const {id:taskID} = req.params;
     const task = await Task.findOneAndDelete({_id:taskID});
     if (!task) {
          return next(createCustomError(`No task with id : ${taskID}`, 404))
     }
     res.status(200).json({task});
})

const editTask = asyncWrapper(async (req, res, next) => {
     const {id:taskID} = req.params;
     const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
          new: true,
          runValidators: true,
          overwrite: true
     });
     if (!task) {
          return next(createCustomError(`No task with id : ${taskID}`, 404))
     }
     res.status(200).json({task});
})

module.exports = { testServerContent, getAllTasks, createTask, getTask, updateTask, deleteTask, editTask };