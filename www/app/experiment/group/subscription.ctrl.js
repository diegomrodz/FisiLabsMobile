// Controller of dashboard.
appControllers.controller('experimentGroupSubscriptionCtrl', function ($scope, $timeout, $http, $state, $stateParams, $ionicHistory, ExperimentTabsService, ExperimentGroupSubscriptionService) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.
    $scope.isAnimated =  $stateParams.isAnimated;

    ExperimentGroupSubscriptionService.get($stateParams.experimentId).then(
        function onSuccess (data) {
            $scope.groups = data;
        },
        function onError () {
        }
    );

    ExperimentTabsService.get($stateParams.experimentId).then(
        function onSuccess (data) {
            $scope.experiment = data;
        },
        function onError () {
        }
    );

    $scope.refresh = function () {
        $http.get(globalVariable.appUrl + '/api/experiment/groups/' + $stateParams.experimentId).then(
            function onSuccess (response) {
                $scope.groups = response.data;

                ExperimentGroupSubscriptionService.set($stateParams.experimentId, $scope.groups);
            },
            function onError (err) {
                alert("Erro ao detalhes do experimento");
            }
        );
    };

    $scope.refresh();

    $scope.hasClicked = false;

    $scope.subscribe = function (id) {
        if ( ! $scope.hasClicked) {
            $scope.hasClicked = true;

            $http.get(globalVariable.appUrl + '/api/experiment_group/subscribe/' + id).then(
                function onSuccess (response) {
                    $scope.refresh();
                    $scope.navigateTo("app.experiment", {
                        experimentId: $stateParams.experimentId
                    });
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
