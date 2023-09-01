const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8000;
const route = require('./routes/routes')
const url = '/api/v1';
const connectToDB = require('./database/connect');
const notFound = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/error-handler');
const path = require('path');

// middleware
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // to get the req.body (data) in the route

// routes
app.use(url, route);
app.use(notFound);
app.use(errorHandlerMiddleware)

/** REST API
 * app.get('/api/v1/tasks')             - get all the new tasks
 * app.post('/api/v1/tasks')            - create a new task
 * app.get('/api/v1/tasks/:id')         - get single task
 * app.patch('/api/v1/tasks/:id')       - update task
 * app.delete('/api/v1/tasks/:id')      - delete task
 */

// start the app
const start = async() => {
     try {
          await connectToDB();
          app.listen(port, console.log(`Server is listening on port ${port}...`));
     } catch(error) {
          console.log(error);
     }
}

start();