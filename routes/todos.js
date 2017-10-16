const route = require('express').Router();
const todos = require('../db/todotable');

route.get('/', (req, res) => {
    todos.showtodo((todolist) => {
        res.send(todolist)
    })
});

route.post('/add', (req, res) => {
    todos.addtodo(req.body.task, () => {
        res.redirect('.')
    })
});

exports.route = route;