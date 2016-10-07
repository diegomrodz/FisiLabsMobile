appServices.service('ExperimentTabsService', function ($q, $localStorage) {
	var service = this;

    service.get = function (id) {
        var deferred = $q.defer();
        
        var _data = $localStorage.experiments_details;
        
        if (_data && _data[id]) {
            deferred.resolve(_data[id]);
        } else {
            deferred.reject("Lista com detalhes de experimentos não salva no storage");
        }
        
        return deferred.promise;
    };

    service.set = function (id, data) {
    	if ( ! $localStorage.experiments_details) {
    		$localStorage.experiments_details = {};
    	}

        $localStorage.experiments_details[id] = data;
    };

    service.destroy = function () {
        $localStorage.$reset();
    };
});