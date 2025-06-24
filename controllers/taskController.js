const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, deadline, category, tags, priority, status } = req.body;
    const task = new Task({
      title,
      deadline,
      category,
      tags,
      priority,
      status: status || 'Pending',
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Erreur création tâche:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, deadline, category, tags, priority, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, deadline, category, tags, priority, status },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error('Erreur mise à jour tâche:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.status(200).json({ message: 'Tâche supprimée' });
  } catch (error) {
    console.error('Erreur suppression tâche:', error);
    res.status(500).json({ error: error.message });
  }
};
