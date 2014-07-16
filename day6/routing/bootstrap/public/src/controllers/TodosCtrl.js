/* global TodoApp */
(function (TodoApp) {
    'use strict';

    TodoApp.controller('TodosCtrl', function TodosCtrl($scope, Todo, todos) {
        $scope.todos = todos;

        $scope.updateState = function updateState(todo) {
            (new Todo(todo)).updateState();
        };
    });

}(TodoApp));


