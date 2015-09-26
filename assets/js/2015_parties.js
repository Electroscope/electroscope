(function(){
	var parties = null;
	
	var party_limit = 50;
	var other = { party:'Other',count:0};
	
	var party_counting = function(party){
		if(isNaN(party_limit)) party_limit = 0;
		console.log(party_limit);
		if(party.count<party_limit){
			other.count += party.count;
		}
		return party.count > party_limit;
	};

	var chart= {
		region:function(responseData){

			var arr = responseData.party_counts.filter(party_counting);
			arr.unshift(other);
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
  			other.count = 0;
		},
		amh:function(responseData){
		
			var arr = responseData.party_counts.filter(party_counting);
			arr.unshift(other);
			
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
  			other.count = 0;
		},

		pth:function(responseData){
			var arr = responseData.party_counts.filter(party_counting);
			arr.unshift(other);
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
  			other.count = 0;
		}

	};


	
	$('document').ready(function(){
		var baseUrl = "http://localhost:3000";
		$.getJSON(baseUrl + "/api/candidates/count/by-party?group_by=parliament", function(response){
			parties = response.data;
			chart.region(parties[0]);
			chart.pth(parties[1]);
			chart.amh(parties[2]);
    	});

		
    	$('#update_limit').click(function(){
    		
    		party_limit = parseInt($('#party_limit').val());
			    		
    		chart.region(parties[0]);
			chart.pth(parties[1]);
			chart.amh(parties[2]);
    	});
	});

})();
