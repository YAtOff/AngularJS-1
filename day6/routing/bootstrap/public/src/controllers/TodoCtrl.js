/* global TodoApp */

(function (TodoApp) {
    'use strict';

    TodoApp.controller('TodoCtrl', function TodoCtrl($scope, $location, Todo, todo) {
        $scope.todo = new Todo(todo);
        $scope.update = function update() {
            $scope.todo.update();
            $location.path('/');
        };

        $scope.save = function update() {
            $scope.todo.save();
            $location.path('/');
        };

        $scope.remove = function update() {
            $scope.todo.destroy();
            $location.path('/');
        };
    });

}(TodoApp));
