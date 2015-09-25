(function(){
	
	var party_limit = 50;
	//var other = { }
	var party_counting = function(party){
		// if(party.count<party_limit){
		// 	other.count += party.count;
		// }
		return party.count > party_limit;
	};

	var chart= {
		region:function(responseData){

			var arr = responseData.party_counts.filter(party_counting);
			
			var labels = arr.map(function(item){return item['party']});
			var counts = arr.map(function(item){return item['count']});
			var ctx = $('#parties-region').get(0).getContext('2d');
			var data = {
    		labels: labels,
    		datasets: [
      					{
					        label: 'Months',
					        fillColor: 'rgba(4,151,179,0.5)',
					        highlightFill: 'rgba(0,163,124,0.5)',
					        data: counts
      					}
    			]
  			};
  			var options = {
    			barStrokeWidth : 1,
    			responsive: true,
    			animation: true,
    			barShowStroke: false,
    
    
  			};

  			new Chart(ctx).HorizontalBar(data, options);	
		},
		amh:function(responseData){
		
			var arr = responseData.party_counts.filter(party_counting);
		
			var labels = arr.map(function(item){return item['party']});
			var counts = arr.map(function(item){return item['count']});
			var ctx = $('#parties-amh').get(0).getContext('2d');
			var data = {
    		labels: labels,
    		datasets: [
      					{
					        label: 'Months',
					        fillColor: 'rgba(4,151,179,0.5)',
					        highlightFill: 'rgba(0,163,124,0.5)',
					        data: counts
      					}
    			]
  			};
  			var options = {
    			barStrokeWidth : 1,
    			responsive: true,
    			animation: true,
    			barShowStroke: false,
    
    
  			};

  			new Chart(ctx).HorizontalBar(data, options);

		},

		pth:function(responseData){
		
			var arr = responseData.party_counts.filter(party_counting);
		
			var labels = arr.map(function(item){return item['party']});
			var counts = arr.map(function(item){return item['count']});
			var ctx = $('#parties-pth').get(0).getContext('2d');
			var data = {
    		labels: labels,
    		datasets: [
      					{
					       
					        fillColor: 'rgba(4,151,179,0.5)',
					        highlightFill: 'rgba(0,163,124,0.5)',
					        data: counts
      					}
    			]
  			};
  			var options = {
    			barStrokeWidth : 1,
    			responsive: true,
    			animation: true,
    			barShowStroke: false,
    
    
  			};

  			new Chart(ctx).HorizontalBar(data, options);

		}

	};


	var baseUrl = "http://localhost:3000";
	$('document').ready(function(){

		$.getJSON(baseUrl + "/api/candidates/count/by-party?group_by=parliament", function(response){
			
			chart.region(response.data[0]);
			chart.pth(response.data[1]);
			chart.amh(response.data[2]);

			
    	});


    	
 
  
	});

})();
