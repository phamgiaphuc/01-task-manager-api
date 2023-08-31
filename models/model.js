const mongoose = require('mongoose');

// Set up the structure for all the documents in the collection
const taskSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [
               true,
               'Must provide a task'
          ],
          trim: true,
          maxlength: [
               50,
               'Task can not be more than 20 characters'
          ]
     },
     completed: {
          type: Boolean,
          default: false
     }
})

module.exports = mongoose.model('Task', taskSchema);