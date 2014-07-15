/* global TodoApp */

(function (TodoApp) {
    'use strict';
    TodoApp.factory('Todo', function ($http) {
        var todos = [];

        function Todo(data) {
            this.id = data.id;
            this.title = data.title;
            this.created = data.created;
            this.until = data.until;
        }

        Todo.get = function get(id) {
            return $http.get('/todo/' + id).then(function (response) {
                return new Todo(response.data);
            });
        };

        Todo.getList = function getList() {
            return $http.get('/todo').then(function (response) {
                return response.data.map(function (d) {
                    return new Todo(d);
                });
            });
        };

        Todo.prototype.save = function save() {
            var self = this;
            $http.post( '/todo',
                {
                    title: this.title,
                    created: this.created,
                    until: this.until,
                }
            ).success(function (data, status, headers, config) {
                self.id = data.id;
            });
        };

        Todo.prototype.destroy = function destroy() {
            $http.delete('/todo/' + this.id).success(function (data, status, headers, config) {
                todos.splice(todos.indexOf(this), 1);
            });
        };

        Todo.getList().then(function (t) {
            todos = t;
        });

        return Todo;
    });
}(TodoApp));
