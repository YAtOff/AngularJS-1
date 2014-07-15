/* global TodoApp */

(function (TodoApp) {
    'use strict';
    TodoApp.factory('Todo', function ($resource) {
        var TodoResource = $resource('/todo/:id', {id: '@id'}),
            todos = [];

        function Todo(data) {
            this.id = data.id;
            this.title = data.title;
            this.created = data.created;
            this.until = data.until;
        }

        Todo.get = function get(id) {
            return TodoResource.get({id: id}).$promise.then(function (data) {
                return new Todo(data);
            });
        };

        Todo.getList = function getList() {
            return TodoResource.query().$promise.then(function (data) {
                return data.map(function (d) {
                    return new Todo(d);
                });
            });
        };

        Todo.prototype.save = function save() {
            var self = this;
            TodoResource.save(this, function(data) {
                self.id = data.id;
            });
        };

        Todo.prototype.destroy = function destroy() {
            todos = todos.filter(function (todo) {
                return todo.id !== this.id;
            }, this);
            TodoResource.delete(this);
        };

        Todo.getList().then(function(tds) {
            todos = tds;
        });

        return Todo;
    });
}(TodoApp));
