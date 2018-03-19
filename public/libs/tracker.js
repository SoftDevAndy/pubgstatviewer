$(document).ready(function(){
  
	$("#one").val("Player One");
	$("#two").val("Player Two");
	$("#three").val("Player Three");
	$("#four").val("Player Four");

	loadingBar(0);

	var retrieving = 0;

	function getStatistics(){
		retrieving = 1;
		loadingBar(1);

		var url = "/stats?";
		var first = 0;
		var empty = 0;
		var count = 1;

		var one = $("#one").val();
		var two = $("#two").val();
		var three = $("#three").val();
		var four = $("#four").val();

		if(one != undefined){	
			count++;		
			if(first == 0){				
				first = 1;
				empty = 1;
				url += ("playerone=" + one);
			}
			else
				url += ("&playerone=" + one);
		}

		if(two != undefined){	
			count++;		
			if(first == 0){				
				first = 1;
				empty = 1;
				url += ("playertwo=" + two);
			}
			else
				url += ("&playertwo=" + two);
		}

		if(three != undefined){			
			count++;
			if(first == 0){				
				first = 1;
				empty = 1;
				url += ("playerthree=" + three);
			}
			else
				url += ("&playerthree=" + three);
		}

		if(four != undefined){		
			count++;	
			if(first == 0){				
				first = 1;
				empty = 1;
				url += ("playerfour=" + four);
			}
			else
				url += ("&playerfour=" + four);
		}	

		if(empty == 1){

			progressBar(count);
			$(".statistics").text("");

			$.get(url, function(data){			
				$(".statistics").text(data);
				retrieving = 0;
				loadingBar(0);
			});				
		}
		else
			alert("Please enter at least one name!");
	}

	/*	Progress Bar */

	function loadingBar(flag){

		if(flag == 1)
			$(".progressbar").show();
		else
		{
			$(".progressbar").hide();
			progressBar(0);
		}
	}

	function progressBar(count){

		var amt = 100 / count;
		var progress = amt;

		for(var i = 0; i < count; i++){

			setTimeout(function(){
				updateBar(progress);
				progress += amt;
			}.bind(this, i), 2000 * i);
		}
	}

	function updateBar(amt){
		$(".progressbar").progressbar({
			value: amt
		});
	}

	/* Click Listeners */

	$("#btn-clear").click(function() {
		clearForm();
	});

	$("#btn-stats").click(function() {
		
		if(retrieving == 0)
			getStatistics();
		else
			alert("Already retrieving results, please wait...");
	});

	function clearForm(){
		$("#one").val("");
		$("#two").val("");
		$("#three").val("");
		$("#four").val("");
	}

});