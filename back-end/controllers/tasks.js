import { Task } from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id: ${taskId}` });
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateTask = async (req, res) => {
  const { id: taskId } = req.params;
  try {
    const task = await Task.findByIdAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with Id: ${taskId}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};