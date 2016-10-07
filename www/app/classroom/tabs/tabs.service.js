appServices.service('ClassroomTabsService', function ($q, $localStorage) {
	var service = this;

    service.get = function (id) {
        var deferred = $q.defer();
        
        var _data = $localStorage.classrooms_details;
        
        if (_data && _data[id]) {
            deferred.resolve(_data[id]);
        } else {
            deferred.reject("Lista com detalhes de salas de estudo não salva no storage");
        }
        
        return deferred.promise;
    };

    service.set = function (id, data) {
    	if ( ! $localStorage.classrooms_details) {
    		$localStorage.classrooms_details = {};
    	}

        $localStorage.classrooms_details[id] = data;
    };

    service.destroy = function () {
        $localStorage.$reset();
    };

});