appControllers.controller('experimentNewSampleCtrl', function ($scope, $http, $timeout, $state,$stateParams, $ionicHistory) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    $scope.sample = {};
    $scope.hasClicked = false;

    $http.get(globalVariable.appUrl + '/api/experiment/detail/' + $stateParams.experimentId).then(
        function onSuccess (response) {
            $scope.experiment = response.data;
        },
        function onError () {
            alert("Erro ao obter dados sobre o experimento");
        }
    );

    $scope.send = function () {
        if ( ! $scope.hasClicked) {
            var data = JSON.stringify($scope.sample);

            $scope.hasClicked = true;

            $http.post(globalVariable.appUrl + '/api/experiment/sample/' + $stateParams.experimentId + '/create', data).then(
                function onSuccess (response) {
                    alert("Medição enviada com sucesso.");
                    $scope.navigateTo('app.experiment', {experimentId: $stateParams.experimentId});
                    $scope.sample = {};
                    $scope.hasClicked = false;
                },
                function onError () {
                    alert("Erro enviar nova medição");
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
