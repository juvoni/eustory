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
				EU[n].addGross_d_Investment(i,this['Data']['Gross domestic investment (% of GDP)'][i]),
				//EU[n].addReal_GDP_G(i,this['Data']['Real GDP growth (%)'][i]),
				EU[n].addRealInvestment(i,this['Data']['Real investment (% change)']),
				EU[n].addCPI(i,this['Data']['Consumer price index (% change)'][i]),
				EU[n].addNFPE(i,this['Data']['Oth DC claims on private & NFPEs (% change)']),
				EU[n].addBank_Claim_res(i,this['Data']['Bank claims on resident non-govt. sectors']),
				EU[n].addUN(i,this['Data']['Unemployment rate (average claimant count; %)'])
			}
			n++;
			//console.log(this['Data']['Nominal GDP (bil. $)'][1999]));
		});
		var countryNumber = 13;
		console.log("Country:"+EU[countryNumber].getName());
		for(var i = 1999; i<=2012; i++){
			console.log(i+":"+EU[countryNumber].getCPI(i));
			//console.log(i+":"+EU[1].getNomGDP(i));
		}

		dataReady();
});
});

$.getJSON('ajax/fiscal_data.json', function(data) {
	$.each(data, function(){

		//size = Object.size(this['Data']['Nominal GDP (bil. $)']);
		for(var  i = startYear; i<startYear+size; i++){
				// EU[n].addDebtToGDP(i,this['Data']['Net general government debt as % of GDP (%)'][i]),
				// EU[n].addDepositToGDP(i,this['Data']['GG debt net of deposits / GDP (%)'][i]),
				// EU[n].addGov_Debt(i,this['Data']['General government debt'][i]),
				// EU[n].addGov_Bal(i,this['Data']['General government balance'][i]),
				// EU[n].addGov_P_Bal(i,this['Data']['General government balance'][i]),
				// EU[n].addGov_Rev(i,this['Data']['General government revenues'][i]),
				// EU[n].addGov_Ex(i,this['Data']['General government expenditures'][i]),
				// EU[n].addInterestToGDP(i,this['Data']['GG interest paid / GDP (%)'][i])
			}

	});
});

