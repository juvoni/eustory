
$(document).ready(function() {
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
	/*
		var e = 14;
		console.log(EU[e].getName());
		for(var i = 1999; i<=2012;i++)
			console.log(i+" "+EU[e].getGov_Rev(i));
	*/

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

				}
			}
		}

	//console.log(mapData[2000]['economy']['AT']);
	//console.log(mapData['2000']["economy"]['AT']);

	var indicator = 'fiscal';
	var countryCode = 'DE';
	for(var i = startYear; i<=endYear;i++){
		//console.log(mapData[i][indicator][countryCode]);
	}
	var nTest = 'N/A';
	//console.log(Number(nTest));
	//console.log(convert(nTest));
	var test = {
		"AT": 0,
"BE": 2,
"CY": 5,
"DE": 7,
"EE": 2,
"ES": 10,
"FI": 17,
"FR": 9,
"GR": 2,
"IE": 3,
"IT": 4,
"LU": 1,
"MT": 5,
"NL": 1,
"PT": 9,
"SI": 5,
"SK": 6
	};
//console.log(mapData['1999'][indicator]);
//console.log(test);
	$('#map').vectorMap({
		map: 'europe_mill_en',
			backgroundColor:'#fffffff',
			normalizeFunction: 'polynomial',
			// color:'#565659',
			color:'#A8A8A8',
			hoverOpacity: 0.8,
			hoverColor: false,
			onLabelShow: function(event, label, code) {
				label.text(label.text() + " (Test)");
			},
			onRegionClick: function (event, code) {},
		        values: test,
		        //values: mapData['1999'][indicator],
				scaleColors: ['#C8EEFF', '#0071A4'],
		        focusOn:{
		          x: 0.6,
		          y: 0.55,
		          scale: 0.8
		        }
		    }
	   );
displayAllEconomy(EU);
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