// Controller of dashboard.
appControllers.controller('classroomTabsCtrl', function ($scope, $http, $timeout, $state,$stateParams, $ionicHistory) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    $http.get(globalVariable.appUrl + '/api/classroom/detail/' + $stateParams.classroomId).then(
        function onSuccess (response) {
            $scope.classroom = response.data;

            $scope.classroom.created_at = new Date($scope.classroom.created_at);
        },
        function onError (err) {
            alert("Erro ao obter lista de salas de estudo.");
        }
    );

    $scope.hasClicked = false;

    $scope.subscribe = function () {
        if ( ! $scope.hasClicked) {
            $scope.hasClicked = true;

            $http.get(globalVariable.appUrl + '/api/classroom/subscribe/' + $stateParams.classroomId).then(
                function onSuccess (response) {
                    $scope.classroom.subscription = response.data;
                },
                function onError (err) {
                    alert("Erro ao obter lista de salas de estudo.");
                    $scope.hasClicked = false;
                }
            );
        }
    };

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
