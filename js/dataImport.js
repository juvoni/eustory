var EU = [];
var doub;
var size = 0; //Number of Years in record
var startYear = 1999;
$(document).ready(function() {

$.getJSON('ajax/economic_data.json', function(data) {

	var n = 0; //Country counter
		$.each(data, function(){

			EU.push(new CountryObj(this['Entity Name'],this['ISO'],this['Data']['Long Term Currency Rating']));
			size = Object.size(this['Data']['Nominal GDP (bil. $)']);
			for(var  i = startYear; i<startYear+size; i++){
				EU[n].addNomGDP(i,this['Data']['Nominal GDP (bil. $)'][i]),
				EU[n].addPerCapita(i,this['Data']['Per capita GDP ($)'][i]),
				EU[n].addGross_d_Saving(i,this['Data']['Gross domestic savings (% of GDP)'][i]),
				EU[n].addGross_d_Investment(i,this['Data']['Gross domestic investment (% of GDP)']),
				EU[n].addReal_GDP_G(i,this['Data']['Real GDP growth (%)']),
				EU[n].addRealInvestment(i,this['Data']['Real investment (% change)']),
				EU[n].addCPI(i,this['Data']['Consumer price index (% change)']),
				EU[n].addNFPE(i,this['Data']['Oth DC claims on private & NFPEs (% change)']),
				EU[n].addBank_Claim_res(i,this['Data']['Bank claims on resident non-govt. sectors']),
				EU[n].addUN(i,this['Data']['Unemployment rate (average claimant count; %)']);
			}
			n++;
			//console.log(this['Data']['Nominal GDP (bil. $)'][1999]));
		});
		var countryNumber = 13;
		//console.log("Country:"+EU[countryNumber].getName());
		//console.log("Per Capita GDP:")
		for(var i = 1999; i<=2012; i++){
			//console.log(i+":"+EU[countryNumber].getPerCapita(i));
			//console.log(i+":"+EU[1].getNomGDP(i));
		}

		dataReady();
});
});

$.getJSON('ajax/fiscal_data.json', function(data) {
	$.each(data, function(){

		//size = Object.size(this['Data']['Nominal GDP (bil. $)']);
	});
});


//console.log("12"+":"+eu[12].getPerCapita(1999));


	this.Fiscal = {
		'Net_Gov_debt_per_GDP':{},
		'GG_debt net of deposits / GDP (%)':{},
		'General government debt':{},
		'General government balance':{},
		'General government primary balance':{},
		'General government revenues':{},
		'General government expenditures':{},
		'GG interest paid / GDP (%)':{}
	};
	this.IIP = {
		'Net external liabilities':{},
		'Gross external debt':{},
		'Public sector ext. debt / CAR (%)':{},
		'Net external debt / CAR (%)':{},
		'Narrow net external debt (% of CARs)':{},
		'Net public sector external debt':{},
		'Net investment payments':{},
		'Net interest payments':{}
	};