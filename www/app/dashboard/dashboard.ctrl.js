// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $http, $state, $stateParams, $ionicHistory, AuthUser) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    $ionicHistory.clearHistory();

    $scope.getClassrooms = function () {
        $http.get(globalVariable.appUrl + '/api/classroom/list').then(
            function onSuccess (response) {
                $scope.classrooms = response.data.data;
            },
            function onError (err) {
                alert("Erro ao obter lista de salas de estudo.");
            }
        );
    };

    $scope.getClassrooms();

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName, params) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName, params);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

}); // End of dashboard controller.
