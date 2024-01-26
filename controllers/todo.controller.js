const TodoModel = require('../models/todo.model');

const createTodo = async (req, res, next) => {
    try {
        const createdModel = await TodoModel.create(req.body);
        res.status(201).json(createdModel);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(500).json({ message: error.message }); // Return 500 for validation error
        } else {
            next(error);
        }
    }
};

const getTodos = async (req, res, next) => {
    try {
        const allTodos = await TodoModel.find({});
        res.status(200).json(allTodos);
    } catch (error) {
        next(error);
    }
};

const getTodoById = async (req, res, next) => {
    try {
        const todo = await TodoModel.findById(req.params.todoId);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ message: 'Todo not found' }); // Return a 404 response when the item doesn't exist
        }
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const updateTodo = await TodoModel.findByIdAndUpdate(
            req.params.todoId,
            req.body,
            {
                new: true,
                useFindAndModify: false
            }
        );
        if (updateTodo) {
            res.status(200).json(updateTodo);
        } else {
            res.status(404).send();
        }
    } catch(error) {
        next(error)
     }
};

const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(req.params.todoId);
        if (deletedTodo) {
            res.status(200).json(deletedTodo);
        } else {
            res.status(404).json(deletedTodo);
    } 
    } catch(error) {
        next(error)
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};
