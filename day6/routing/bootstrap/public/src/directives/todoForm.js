/* global TodoApp */
(function (TodoApp) {
    'use strict';

    TodoApp.directive('todoForm', function todoForm() {
        return {
            templateUrl: 'src/directives/todoForm.html',
            restrict: 'E',
            scope: {
                todo: '=',
                save: '&'
            },
            link: function link(scope, element, attrs) {
                scope.saveData = function saveData() {
                    if (scope.todoForm.$valid) {
                        scope.save(scope.todo);
                    }
                };
            }
        };
    });

}(TodoApp));



