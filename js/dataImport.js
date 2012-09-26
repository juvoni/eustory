
$(document).ready(function() {
	var test = false;
	$('li.Criteria p').hide();
    $('li.selected p').show();
      $('ul.historical li.selected').prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');
      var myClass = "economy";
      var currentYear = 1999;
	//---------------Blue------------------------Green---------------Red--------------/
	var colorS = [['#1D578C', '#ffffff'],['#007C44','#ffffff'],['#E3173E','#ffffff']];
	var colorIndicator = 2;
    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $('li.Criteria p').hide();
        $("ul li.selected p").show();
        myClass = $(this).attr("class").split(' ')[1];
        $("ul.historical li.selected").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        setIndicator(myClass);
        renderBy(myClass,EU);
        colorIndicator = updateColor(myClass);
        updateC();
                var barPosition;
        switch(myClass){
			case "economy": barPosition = '0px 0px';
			break;
			case "fiscal": barPosition = '0px -22px';
			break;
			case "external": barPosition = '0px -44px';
			break;
        }
        $('.bar').css("backgroundPosition",barPosition);
        console.log(colorIndicator);
        console.log(myClass);
    });

    $("ul.historical li").click(function() {
        $("ul.historical li").removeClass("selected");
        $("ul.historical li p").remove();
        $(this).addClass("selected");
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $("ul.historical li").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        //$("ul.historical li.selected").removeClass("rating fiscal economy external");
        var year = $(this).text();
        var remove = year.charAt(0);
        currentYear = year.replace(remove,"");
        setYear(currentYear);
        renderBy(myClass,EU,currentYear);


        console.log(currentYear);
      });
    $("#showHide").click(function(){
      var theDiv = $('#toggle');
      if(theDiv.css('display') == 'none'){
        $(this).next().css('display','block');
        $(this).text("Hide");
      }
      else{
        $(this).next().css('display','none');
        $(this).text("Read More..");
      }
    });
	$.ajaxSetup({
		async: false
	});
	var EU = [];
	var doub;
	var size = 0; //Number of Years in record
	var startYear = 1999;
	var endYear = 2012;
	var mapData = {};
	var indicator;
	var cCode


	$.getJSON('ajax/economic_data.json', function(data) {
		var n = 0; //Country counter
			$.each(data, function(){
				EU.push(new CountryObj(this['Entity Name'],this['ISO'],this['Data']['Long Term Currency Rating']));
				for(var  i = startYear; i<=endYear; i++){
					EU[n].addNomGDP(i,this['Data']['Nominal GDP (bil. $)'][i]),
					EU[n].addPerCapita(i,this['Data']['Per capita GDP ($)'][i]),
					EU[n].addGross_d_Saving(i,this['Data']['Gross domestic savings (% of GDP)'][i]),
					EU[n].addGross_d_Investment(i,this['Data']['Gross domestic investment (% of GDP)'][i]),
					EU[n].addReal_GDP_G(i,this['Data']['Real GDP growth (%)'][i]),
					EU[n].addRealInvestment(i,this['Data']['Real investment (% change)'][i]),
					EU[n].addCPI(i,this['Data']['Consumer price index (% change)'][i]),
					EU[n].addNFPE(i,this['Data']['Oth DC claims on private & NFPEs (% change)'][i]),
					EU[n].addBank_Claim_res(i,this['Data']['Bank claims on resident non-govt. sectors'][i]),
					EU[n].addUN(i,this['Data']['Unemployment rate (average claimant count; %)'][i]);
				}
				n++;
			});
	});


	$.getJSON('ajax/fiscal_data.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
					EU[n].addDebtToGDP(i,this['Data']['Net general government debt as % of GDP (%)'][i]),
					EU[n].addDepositToGDP(i,this['Data']['GG debt net of deposits / GDP (%)'][i]),
					EU[n].addGov_Debt(i,this['Data']['General government debt'][i]),
					EU[n].addGov_Bal(i,this['Data']['General government balance'][i]),
					EU[n].addGov_P_Bal(i,this['Data']['General government balance'][i]),
					EU[n].addGov_Rev(i,this['Data']['General government revenues'][i]),
					EU[n].addGov_Ex(i,this['Data']['General government expenditures'][i]),
					EU[n].addInterestToGDP(i,this['Data']['GG interest paid / GDP (%)'][i])
				}
				n++;
		});
	});

	$.getJSON('ajax/external.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
					EU[n].addELiabilities(i,this['Data']['Net external liabilities'][i]),
					EU[n].addEDebt(i,this['Data']['Gross external debt'][i]),
					EU[n].addPublicToCar(i,this['Data']['Public sector ext. debt / CAR (%)'][i]),
					EU[n].addExternalToCar(i,this['Data']['Net external debt / CAR (%)'][i]),
					EU[n].addNarrowExToCar(i,this['Data']['Narrow net external debt (% of CARs)'][i]),
					EU[n].addPublicExternal(i,this['Data']['Net public sector external debt'][i]),
					EU[n].addInvestmentPay(i,this['Data']['Net investment payments'][i]),
					EU[n].addInterestPay(i,this['Data']['Net interest payments'][i])
				}
				n++;
		});

	});
	$.getJSON('ajax/Ratings.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
				EU[n].addRating(i,this[i]);
			}
				n++;
		});

	});

		for(var year = startYear; year<=endYear;year++){
			mapData[year]={};

			for(var i = 1; i<=3;i++){
				switch(i){
					case 1: indicator = "economy";
					break;
					case 2: indicator = "fiscal";
					break;
					case 3: indicator = "external";
					break;
					case 4: indicator = "rating";
					break;
					default:
					break;
				}
				mapData[year][indicator]={};
				for(var j = 0; j<17;j++){
					cCode = EU[j].getCode();
					if(indicator === "economy")
						mapData[year][indicator][cCode] = convert(EU[j].getPerCapita(year));
					else if(indicator === "fiscal")
						mapData[year][indicator][cCode] = convert(EU[j].getDebtToGDP(year));
					else if(indicator === "external")
						mapData[year][indicator][cCode] = convert(EU[j].getDebtToGDP(year));
					else if(indicator === "rating")
						mapData[year][indicator][cCode] = EU[j].getRating(year);

				}
			}
		}

	//console.log(mapData[2000]['economy']['AT']);
	//console.log(mapData['2000']["economy"]['AT']);
	//passData(EU);

	var nTest = 'N/A';
	//console.log(Number(nTest));
	//console.log(convert(nTest));
	var dummyData = {
		"AT": 1,
		"BE": 2,
		"CY": 5,
		"DE": 1,
		"EE": 2,
		"ES": 5,
		"FI": 6,
		"FR": 9,
		"GR": 10,
		"IE": 3,
		"IT": 4,
		"LU": 1,
		"MT": 5,
		"NL": 1,
		"PT": 3,
		"SI": 5,
		"SK": 6
	};
//var mapObject = $('#map').vectorMap('get', 'mapObject');
//console.log(mapData['1999'][indicator]);
//console.log(test);
	$('#map').vectorMap({
		map: 'europe_mill_en',
			backgroundColor:'#808080',
			regionsSelectable: 'true',
			selected: {
				fill: 'yellow'
			},
			regionStyle:{
				 initial: {
					fill: '#c7c7c7',
				    "fill-opacity": 1,
				    stroke: '#cccccc',
				    "stroke-width": 0.5,
				    "stroke-opacity": 1
				},
			},
			hoverOpacity: 0.8,
			hoverColor: false,
			onLabelShow: function(event, label, code) {
				label.text(label.text() + " (Test)");
			},
			onRegionClick: function (event, code) {
				console.log(code);
			},
			series:{
				regions:[{
					scale:colorS[colorIndicator],
					attribute: 'fill',
					values: dummyData,
					normalizeFunction: 'linear'
				}]
			},
		  //       //values: mapData['1999'][indicator],
				// scaleColors: colorS[colorIndicator],
		        focusOn:{
		          x: 0.6,
		          y: 0.55,
		          scale: 0.8
		        }
		    }
	   );
	var mapObject = $('#map').vectorMap('get', 'mapObject');
	function updateC(){
		mapObject.series.regions[0].setScale(colorS[colorIndicator]);
	};
displayAllEconomy(EU);


if(test){
	var testName = 4;
	console.log(EU[testName].getName());
	for(var i = startYear;i<=endYear;i++){

		console.log(i+"=>"+EU[testName].getRating(i));
	}
}

});

/*
		initial: {
        fill: 'black',
        "fill-opacity": 1,
		stroke: 'none',
		"stroke-width": 0,
		"stroke-opacity": 1
				},

*/