
$(document).ready(function() {
	var test = false;
	var $description = $('li.Criteria p');
	$description.hide();
    $("li.selected p").show();
      $("ul.historical li.selected").prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');
      var myClass = "economy";
      var currentYear = 1999;
	//---------------Blue------------------------Green---------------Red--------------/
	var colorS = [['#ffffff','#1D578C'],['#ffffff','#007C44'],['#ffffff','#E3173E']];
	var ratingScore =["AAA","AA+","AA-","AA","A+","A-","A","BBB+","BBB-","BBB","BB+","BB-","BB","B+","B-","B","CCC+","CCC-","CCC","CC"];
	var colorIndicator = 2;
	var codeArray = [];

	var EU = [];
	var startYear = 1999;
	var endYear = 2012;
	var mapData = {};
	var indicator = myClass;

    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $description.hide();
        $("ul li.selected p").show();
        myClass = $(this).attr("class").split(' ')[1];
        $("ul.historical li.selected").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        //setIndicator(myClass);
        renderBy(myClass,EU);
        colorIndicator = updateColor(myClass);
        updateC();
        updateValue();
        var barPosition;
        switch(myClass){
			case "economy": barPosition = '0px 0px';
			break;
			case "fiscal": barPosition = '0px -22px';
			break;
			case "external": barPosition = '0px -44px';
			break;
			case "rating": barPosition = '0px 0px';
			break;
        }
        $('.bar').css("backgroundPosition",barPosition);
        //console.log(colorIndicator);
        console.log(myClass);
    });

    $("ul.historical li").click(function() {
        $("ul.historical li").removeClass("selected");
        $("ul.historical li p").remove();
        $(this).addClass("selected");
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $("ul.historical li").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        var year = $(this).text();
        var remove = year.charAt(0);
        currentYear = year.replace(remove,"");
        //setYear(currentYear);
        renderBy(myClass,EU,currentYear);
        updateValue();
      });
	$.ajaxSetup({
		async: false
	});

	$.getJSON('ajax/economic.json', function(data) {
		var n = 0; //Country counter
			$.each(data, function(){
				EU.push(new CountryObj(this['Entity Name'],this['ISO'],this['Data']['Long Term Currency Rating']));
				for(var  i = startYear; i<=endYear; i++){
					EU[n].addNomGDP(i,this['Data']['Nominal GDP (bil. $)'][i])
					EU[n].addPerCapita(i,this['Data']['Per capita GDP (US$)'][i]),
					EU[n].addReal_GDP_G(i,this['Data']['Real GDP growth (%)'][i]),
					EU[n].addGDP_per_capita(i,this['Data']['Real GDP per capita (% change)'][i]),
					EU[n].addNFPE(i,this['Data']['Oth DC claims on private & NFPEs (% change)'][i]),
					EU[n].addBank_Claim_res(i,this['Data']['Bank claims on resident non-govt. sectors / GDP'][i])
				}
				//codeArray.push(EU[n].getCode());
				n++;
			});
	});

//console.log(codeArray);
	$.getJSON('ajax/fiscal.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
				EU[n].addGG_bal_per_GDP(i,this['Data']['General government balance as % of GDP (%)'][i]),
				EU[n].addChange_GG_debt_per_GDP(i,this['Data']['Change in general government debt as % of GDP'][i]),
				EU[n].addGG_debt_per_GDP(i,this['Data']['Net general government debt as % of GDP (%)'][i]),
				EU[n].addGG_interest_exp_per_revenue(i,this['Data']['General government interest exp. (% of revenues)'][i])
			}
				n++;
		});
	});

	$.getJSON('ajax/external.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
					EU[n].addELiabilities(i,this['Data']['Net external liabilities (% of CARs)'][i]),
					EU[n].addNarrowExToCar(i,this['Data']['Narrow net external debt (% of CARs)'][i])
				}
				n++;
		});

	});
	$.getJSON('ajax/Ratings.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
				EU[n].addRatingHistorical(i,this[i]);
			}
				n++;
		});

	});

		for(var year = startYear; year<=endYear;year++){
			mapData[year]={};

			for(var i = 1; i<=4;i++){
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
						mapData[year][indicator][cCode] = convert(EU[j].getReal_GDP_G(year));
					else if(indicator === "fiscal")
						mapData[year][indicator][cCode] = convert(EU[j].getGG_debt_per_GDP(year));
					else if(indicator === "external")
						mapData[year][indicator][cCode] = convert(EU[j].getELiabilities(year));
					else if(indicator === "rating"){
						for(var k = 0; k<ratingScore.length;k++){
							if(EU[j].getRatingHistorical(year) === ratingScore[k]){
								mapData[year][indicator][cCode] = k;
								break;
							}

						}
					}
				}
			}
		}


	var nTest = 'N/A';
	//console.log(Number(nTest));
	//console.log(convert(nTest));
	var dummyData = {"AT": 1,"BE": 2,"CY": 5,"DE": 1,"EE": 2,"ES": 5,"FI": 6,"FR": 9,"GR": 10,"IE": 3,"IT": 4,"LU": 1,"MT": 5,"NL": 1,"PT": 3,"SI": 5,"SK": 6};

	$('#map').vectorMap({
		map: 'europe_mill_en',
			backgroundColor:'#808080',
			regionsSelectable: false,
			regionStyle:{
				 initial: {
					fill: '#c7c7c7',
				    "fill-opacity": 1,
				    stroke: '#cccccc',
				    "stroke-width": 0.5,
				    "stroke-opacity": 1,
				},
				hover:{
					stroke: '#414042',
					"stroke-width": 1,
					opacity: 0.8,
					color: false
				}
			},
			onRegionLabelShow: function(event, label, code) {
					label.text(label.text());
			},
			onRegionClick: function (event, code) {
				console.log(code);
			},
			series:{
				regions:[{
					scale:colorS[colorIndicator],
					attribute: 'fill',
					values: mapData[currentYear][indicator],
					normalizeFunction: 'polynomial'
				}]
			},
		    focusOn:{
		        x: 0.6,
		        y: 0.55,
		        scale: 0.8
		    }
	 });
	var mapObject = $('#map').vectorMap('get', 'mapObject');

	function updateC(){
		mapObject.series.regions[0].setScale(colorS[colorIndicator]);
	};
	function updateValue(){
		mapObject.series.regions[0].setValues(mapData[currentYear][indicator]);
	};

displayAllEconomy(EU);

if(test){
	var testName = 4;
	var CountrySelect = 10;
	//console.log(EU[testName].getName());
	for(var i = startYear;i<=endYear;i++){

		//console.log(i+"=>"+typeof(Number(EU[CountrySelect].getELiabilities(i))));
	}
	console.log(convert("N.A"));
}

});

