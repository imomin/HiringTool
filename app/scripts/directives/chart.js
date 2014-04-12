'use strict';
app.directive("googleChart",function(){  
	  return {
	      restrict : "A",
	      scope: {
			'loadData':'&',
			ngModel: '='	      	 
	      },
	      link: function($scope, $elem, $attr){
	      	 $scope.$watch('ngModel', function() {	      	 	
	      	 	var data = $scope.loadData();
			      	var dt = data.dataTable;
		          	var options = {};
		          	if($attr.title)
						options.title = $attr.title;
					if($attr.width)
						options.width = $attr.width;
					if($attr.height)
						options.height = $attr.height;
					if($attr.colors && angular.isArray($attr.colors.split(",")))
					 	options.colors = $attr.colors.split(",");
					 options.is3D = true;
					if($attr.googleChart === 'ComboChart'){// its 4 am, i'll just hardcode it for now.
						options.seriesType = "line";
						options.series = {
							0:{targetAxisIndex:1}, 
							1:{type:"bars",targetAxisIndex:0}
						};
					}
		          	var googleChart = new google.visualization[$attr.googleChart]($elem[0]);
		          	googleChart.draw(dt,options);
	      	 }, true);
	         
	      }
	  }
	});
/*
#FF0000,
#00FF00,
#0000FF,
#FFFF00,
#00FFFF,
#FF00FF,
#808080,
#FF8080,
#80FF80,
#8080FF,
#008080,
#800080,
#808000,
#FFFF80,
#80FFFF,
#FF80FF,
#FF0080,
#80FF00,
#0080FF,
#00FF80,
#8000FF,
#FF8000,
#000080,
#800000,
#008000,
#404040,
#FF4040,
#40FF40,
#4040FF,
#004040,
#400040,
#404000,
#804040,
#408040,
#404080,
#FFFF40,
#40FFFF,
#FF40FF,
#FF0040,
#40FF00,
#0040FF,
#FF8040,
#40FF80,
#8040FF,
#00FF40,
#4000FF,
#FF4000,
#000040,
#400000,
#004000,
#008040,
#400080,
#804000,
#80FF40,
#4080FF,
#FF4080,
#800040,
#408000,
#004080,
#808040,
#408080,
#804080,
#C0C0C0,
#FFC0C0,
#C0FFC0,
#C0C0FF,
#00C0C0,
#C000C0,
#C0C000,
#80C0C0,
#C080C0,
#C0C080,
#40C0C0,
#C040C0,
#C0C040,
#FFFFC0,
#C0FFFF,
#FFC0FF,
#FF00C0,
#C0FF00,
#00C0FF,
#FF80C0,
#C0FF80,
#80C0FF,
#FF40C0,
#C0FF40,
#40C0FF,
#00FFC0,
#C000FF,
#FFC000,
#0000C0,
#C00000,
#00C000,
#0080C0,
#C00080,
#80C000,
#0040C0,
#C00040,
#40C000,
#80FFC0,
#C080FF,
#FFC080,
#8000C0,
#C08000,
#00C080,
#8080C0,
#C08080,
#80C080,
#8040C0,
#C08040,
#40C080,
#40FFC0,
#C040FF,
#FFC040,
#4000C0,
#C04000,
#00C040,
#4080C0,
#C04080,
#80C040,
#4040C0,
#C04040,
#40C040,
#202020,
#FF2020,
#20FF20
*/