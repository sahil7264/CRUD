const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // Added for method override support
const taskController = require('./controllers/taskController');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://0.0.0.0:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Method override middleware setup
app.use(methodOverride('_method'));

app.get('/', taskController.getAllTasks);
app.post('/tasks', taskController.createTask);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
