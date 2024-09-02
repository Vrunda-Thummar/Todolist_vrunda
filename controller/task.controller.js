const Task = require('../model/Task');

exports.showallTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.render('task', { tasks });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.addnewTask = async (req, res) => {
    const { description } = req.body;
    try {
        const newTask = new Task({
            description,
            user: req.user.id
        });
        await newTask.save();
        req.flash('success', 'Task added successfully!');
        res.redirect('/tasks');
    } catch (err) {
        req.flash('error', 'Failed to add task');
        res.redirect('/tasks');
    }
};

exports.deleteTasks = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        req.flash('success', 'Task deleted successfully!');
        res.redirect('/tasks');
    } catch (err) {
        req.flash('error', 'Failed to delete task');
        res.redirect('/tasks');
    }
};

exports.completeTask = async (req, res) => { 
    try { 
        const task = await Task.findById(req.params.id); 
        task.completed = !task.completed; 
        await task.save(); 
        req.flash('success', 'Task updated successfully!'); 
        res.redirect('/tasks'); 
    } catch (err) { 
        req.flash('error', 'Failed to update task'); 
        res.redirect('/tasks'); 
    } 
}


exports.editTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        res.render('edit-task', { task });
    } catch (err) {
        req.flash('error', 'Failed to load task for editing');
        res.redirect('/tasks');
    }
};

exports.updateTask = async (req, res) => {
    const { description } = req.body;
    try {
        await Task.findByIdAndUpdate(req.params.id, { description });
        req.flash('success', 'Task updated successfully!');
        res.redirect('/tasks');
    } catch (err) {
        req.flash('error', 'Failed to update task');
        res.redirect('/tasks');
    }
};

