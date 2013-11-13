/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-13
 * Time: PM9:40
 * To change this template use File | Settings | File Templates.
 */
var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function PhoneListCtrl($scope) {
    $scope.phones = [
        {'name': 'Nexus S',
            'snippet': 'Fast just got faster with Nexus S.', 'age':3},
        {'name': 'Motorola XOOM™ with Wi-Fi',
            'snippet': 'The Next, Next Generation tablet.', 'age':4},
        {'name': 'MOTOROLA XOOM™',
            'snippet': 'The Next, Next Generation tablet.', 'age':1}
    ];
});