/* global TodoApp */

TodoApp.factory('Todo', function ($http, $q) {
    'use strict';
    var todos = [];

    function Todo(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.completed = data.completed;
        this.created = new Date();
    }

    Todo.prototype.save = function () {
        var self = this;
        todos.push(this);
        $http.post('/todo', this).then(function (res) {
            self.id = res.data.id;
        });
    };

    Todo.prototype.update = function () {
        todos = todos.filter(function (todo) {
            return todo.id !== this.id;
        }, this);
        todos.push(this);
        $http.post('/todo/' + this.id, this);
    };

    Todo.prototype.updateState = function () {
        $http.post('/todo/state/' + this.id, this);
    };

    Todo.prototype.destroy = function () {
        todos = todos.filter(function (todo) {
            return todo.id !== this.id;
        }, this);
        $http.delete('/todo/' + this.id);
    };

    Todo.getList = function () {
        if (todos) {
            return $q.when(todos);
        } else {
            return $http.get('/todo').then(function (res) {
                res.data.forEach(function (todo) {
                    todos.push(todo);
                });
                return todos;
            });
        }
    };

    Todo.get = function (id) {
        var foundTodos = todos.filter(function (todo) {
            return todo.id === id;
        });
        if (foundTodos) {
            return $q.when(foundTodos[0]);
        } else {
            return $http.get('/todo/' + id).then(function (res) {
                var todo = new Todo(res.data);
                todos.push(todo);
                return todo;
            });
        }
    };

    return Todo;
});
