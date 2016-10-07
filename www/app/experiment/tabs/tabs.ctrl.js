// Controller of dashboard.
appControllers.controller('experimentTabsCtrl', function ($scope, $timeout, $http, $state, $stateParams, $ionicHistory, ExperimentTabsService) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    $scope.experiment = ExperimentTabsService.get($stateParams.experimentId);

    $scope.refresh = function () {
        $http.get(globalVariable.appUrl + '/api/experiment/detail/' + $stateParams.experimentId).then(
            function onSuccess (response) {
                $scope.experiment = response.data;
                $scope.experiment.created_at = new Date($scope.experiment.created_at);

                ExperimentTabsService.set($stateParams.experimentId, $scope.experiment);
            },
            function onError (err) {
                alert("Erro ao detalhes do experimento");
            }
        );
    };

    $scope.refresh();

    $scope.hasClicked = false;

    $scope.subscribe = function () {
        if ( ! $scope.hasClicked) {
            $scope.hasClicked = true;

            if ($scope.experiment.experiment_mode == "individual") {
                $http.get(globalVariable.appUrl + '/api/experiment/subscribe/' + $stateParams.experimentId).then(
                    function onSuccess (response) {
                        $scope.refresh();
                    },
                    function onError (err) {
                        alert("Erro ao obter lista de salas de estudo.");
                        $scope.hasClicked = false;
                    }
                );
            } else if ($scope.experiment.experiment_mode == "group") {
                $scope.navigateTo('app.experiment_group_subscription', {'experimentId': $stateParams.experimentId});
            }
            
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
