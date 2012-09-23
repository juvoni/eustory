$(document).ready(function() {
	$.ajaxSetup({
		async: false
	});
	var EU = [];
	var doub;
	var size = 0; //Number of Years in record
	var startYear = 1999;
	var endYear = 2012;


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
		var e = 14;
		console.log(EU[e].getName());
		for(var i = 1999; i<=2012;i++)
			console.log(i+" "+EU[e].getGov_Rev(i));
});

