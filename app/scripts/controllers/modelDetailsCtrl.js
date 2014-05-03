var modelDetailsCtrl = function($scope, $modal, $location, $routeParams, $firebase, ModelService) {
	//ModelService.init('https://hranalytics.firebaseio.com/models');
  	$scope.model = ModelService.getById($routeParams.id);
  	$scope.maxWeightValidation = /^[1-5]$/;
  	$scope.selectedCandidateId;
  	$scope.selectedCandidate;  	
  	$scope.salaryChart = {};
  	$scope.salaryChart.dataTable = new google.visualization.DataTable();

  	/**************/
  	$scope.scopes = [];
    $scope.value = 5;
    $scope.values = {
	    low : 4,
	    high: 7
    };
    $scope.scale = function(value) {
	    return Math.pow(value, 3);
    };
    $scope.inverseScale = function(value) {
	    var sign = value == 0?1:(value / Math.abs(value));
	    return sign * Math.pow(Math.abs(value), 1 / 3);
    };
  	/**************/

	$scope.candidateEditor = function(candidate, id){
		$scope.selectedCandidateId = id;
		$scope.selectedCandidate = candidate ? candidate : {}
		$scope.isNew = id ? false : true;
		var modalInstance = $modal.open({
	      templateUrl: 'views/CandidateManager.html',
	      controller: editCandidateCtrl,
	      resolve: {
	        candidate: function () {
	          return $scope.selectedCandidate;
	        },
	        model: function () {
	          return $scope.model;
	        },
	        candidateId: function () {
	          return $scope.selectedCandidateId;
	        }
	      }
	    });
	    modalInstance.result.then(function (selectedCandidate) {
			if($scope.isNew){
				//ModelService.init('https://hranalytics.firebaseio.com/models/'+ $scope.model.$id + '/candidates');
				//ModelService.add(selectedCandidate);
				ModelService.addCandidate($scope.model.$id,selectedCandidate);
			}
	      else {
	      	$scope.model.candidates[$scope.selectedCandidateId] = selectedCandidate;
	        //ModelService.init('https://hranalytics.firebaseio.com/models/'+ $scope.model.$id + '/candidates/');
			//ModelService.update(selectedCandidate,$scope.selectedCandidateId);
			ModelService.updateCandidate($scope.model.$id,$scope.selectedCandidateId,selectedCandidate);
	      }
	    });
	}

	$scope.getRunningTotal = function(candidate){
		var skills = candidate.skills;
		var criterias = $scope.model.criterias;
		var total = 0;
		for (var i = 0; i < skills.length; i++) {
			total = total + (skills[i].score * criterias[i].weight);
		};
		candidate.totalScore = total;		
		return total;
	}

	$scope.getAverageTotal = function(skillIndex){
		var candidateCount = 0;
		var average = 0;
		 angular.forEach($scope.model.candidates, function(candidate, key){
		 		average += parseInt(candidate.skills[skillIndex].score);
		 		candidateCount ++;
		 });
		return (average/candidateCount);
	}

	$scope.getRunningTotalAverage = function(){
		var averageRunningTotal = 0;
		var candidateCount = 0;
		angular.forEach($scope.model.candidates, function(candidate, key){
		 		averageRunningTotal += parseInt($scope.getRunningTotal(candidate));
		 		candidateCount ++;
		 });
		return (averageRunningTotal/candidateCount);
	}

	$scope.getChartData = function(index){
		var data = {};
		data.dataTable = new google.visualization.DataTable();
		data.dataTable.addColumn("string","Name");
		data.dataTable.addColumn("number",$scope.model.criterias[index].name);
		angular.forEach($scope.model.candidates, function(candidate, key){
			data.dataTable.addRow([candidate.name,parseInt($scope.model.candidates[key].skills[index].score)]);
		});
		data.dataTable.sort([{column:1, desc:true}]);
		$scope['skillChart' + index] = data;
		return $scope['skillChart' + index];
	}

	$scope.getTotalScoreChart = function(){
		var totalScoreChart = {};
		totalScoreChart.dataTable = new google.visualization.DataTable();
		totalScoreChart.dataTable.addColumn("string","Candidate");
		totalScoreChart.dataTable.addColumn("number","Score");
		totalScoreChart.dataTable.zf = [];//clear rows
		angular.forEach($scope.model.candidates, function(candidate, key){
			totalScoreChart.dataTable.addRow([candidate.name,candidate.totalScore]);		
		});
		totalScoreChart.dataTable.sort([{column:1, desc:true}]);
		$scope.totalScoreChart = totalScoreChart;
		return $scope.totalScoreChart;
	}

	$scope.getSkillsSummartChart = function(){
		var skillsSummartChart = {};
		skillsSummartChart.dataTable = new google.visualization.DataTable();
		skillsSummartChart.dataTable.addColumn("string","Candidate");
		angular.forEach($scope.model.criterias, function(skill,index){
			skillsSummartChart.dataTable.addColumn("number",skill.name);
		});
		skillsSummartChart.dataTable.zf = [];//clear rows		
		angular.forEach($scope.model.candidates, function(candidate, key){
			var rowArray = [];
			rowArray.push(candidate.name);
			angular.forEach(candidate.skills, function(skill, index){
				rowArray.push(parseInt(skill.score));
			});
			skillsSummartChart.dataTable.addRow(rowArray);		
		});
		$scope.skillsSummartChart = skillsSummartChart;
		return $scope.skillsSummartChart;
	}

	$scope.getSalaryChart = function(){
		var salaryChart = {};
		salaryChart.dataTable = new google.visualization.DataTable();
		salaryChart.dataTable.addColumn("string","Candidate");
		salaryChart.dataTable.addColumn("number","Salary");
		salaryChart.dataTable.addColumn("number","Score");
		salaryChart.dataTable.zf = [];//clear rows
		angular.forEach($scope.model.candidates, function(candidate, key){
			salaryChart.dataTable.addRow([candidate.name, parseInt(candidate.salary), parseInt($scope.getRunningTotal(candidate))]);
		});
		salaryChart.options = {
			seriesType: "bars",
        	series: {1: {type: "line"}}
		}
		$scope.salaryChart = salaryChart;
		return $scope.salaryChart;
	}

	$scope.back = function(){
		$location.path('/').replace();
    }
};

var editCandidateCtrl = function ($scope, $modalInstance, candidate, model, candidateId, ModelService) {
  $scope.candidate = candidate;
  $scope.isNew = false;
  if(!candidate.name){//if it is new candidate
  	$scope.isNew = true;
	$scope.candidate = {
		skills:[],
	  	salary:0,
	  	name:""
	};
	for (var i = 0; i < model.criterias.length; i++) {
		 $scope.candidate.skills.push({"name":model.criterias[i].name,"score":""});
	};
  }


  $scope.ok = function (candidateForm) {
  	if(candidateForm.$valid){
    	$modalInstance.close($scope.candidate);
	}
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.delete = function () {
  	ModelService.deleteCandidate(model.$id,candidateId);
	$modalInstance.dismiss('cancel');
  };

  $scope.addCriteria = function (candidateForm,candidate) {    
      if(modelForm.$valid) {
        $scope.candidate.skills.push({"name":candidate.skill.name,"weight":candidate.skill.weight});
        $scope.candidate.skill.name = "";      
        $scope.candidate.skill.weight = "";
      }
  };

  $scope.removeCriteria = function (criteria) {
    for (var i = $scope.candidate.skills.length - 1; i >= 0; i--) {
          if($scope.candidate.skills[i].name == criteria.name && $scope.candidate.skills[i].weight == skill.weight) {
            $scope.candidate.skills.splice(i, 1);
          }
    };
  }
};