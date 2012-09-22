function CountryObj(name, code, rating){
	this.name = name;
	this.code = code;
	this.rating = rating;

	this.Economic = {
		'Nominal_GDP':{},
		'Per_capita_GDP':{},
		'Gross_domestic_savings':{},
		'Gross_domestic_investment':{},
		'Real_GDP_growth':{},
		'Real_investment':{},
		'Consumer_price_index':{},
		'Oth_DC_claims_on_private_NFPEs':{},
		'Bank_claims_on_resident_non_govt_sectors':{},
		'Unemployment_rate':{}
	};
	this.Fiscal = {
		'Net general government debt as % of GDP (%)':{},
		'GG debt net of deposits / GDP (%)':{},
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


};
function err_y(){
	console.log("Invalid Year");
};
CountryObj.prototype ={
	getName: function(){
		return this.name;
	},
	getCode: function(){
		return this.code;
	},
	getRating: function(){
		return this.rating;
	},
	//--------------------Economic Functions--------------------------------//
	addNomGDP: function(key,val){
		this.Economic['Nominal_GDP'][key] = val;
	},
	addPerCapita: function(key,val){
		this.Economic['Per_capita_GDP'][key] = val;
	},
	addGross_d_Saving: function(key,val){
		this.Economic['Gross_domestic_savings'][key]= val;
	},
	addGross_d_Investment: function(key,val){
		this.Economic['Gross_domestic_investment'][key] = val;
	},
	addReal_GDP_G: function(key,val){
		this.Economic['Real_GDP_growth'][key] = val;
	},
	addRealInvestment: function(key,val){
		this.Economic['Real_investment'][key] = val;
	},
	addCPI: function(key,val){
		this.Economic['Consumer_price_index'][key] = val;
	},
	addNFPE: function(key,val){
		this.Economic['Oth_DC_claims_on_private_NFPEs'][key] = val;
	},
	addBank_Claim_res: function(key,val){
		this.Economic['Bank_claims_on_resident_non_govt_sectors'][key] = val;
	},
	addUN: function(key,val){
		this.Economic['Unemployment_rate'][key] = val;
	},
	getNomGDP: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Nominal_GDP'][year];
	},
	getPerCapita: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Per_capita_GDP'][year];
	},
	getGross_d_Saving: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Gross_domestic_savings'][year];
	},
	getGross_d_Investment: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Gross_domestic_investment'][year];
	},
	getReal_GDP_G: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Real_GDP_growth'][year];
	},
	getRealInvestment: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Real_investment'][year];
	},
	getCPI: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Consumer_price_index'][year];
	},
	getNFPE: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Oth_DC_claims_on_private_NFPEs'][year];
	},
	getBank_Claim_res: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Bank_claims_on_resident_non_govt_sectors'][year];
	},
	getUN: function(year){
		if(year<1999)
			err_y();
		return this.Economic['Unemployment_rate'][year];
	}

	//--------------------Fiscal Functions--------------------------------//
	addDebtToGDP: function(key,val){
		this.Fiscal['Net_Gov_debt_per_GDP'][key] = val;
	},
	addDepositToGDP: function(key,val){
		this.Fiscal['GG_debtDeposits_GDP'][key] = val;
	},
	addGov_Debt: function(key,val){
		this.Fiscal['Gov_Debt'][key] = val;
	},
	addGov_Bal: function(key,val){
		this.Fiscal['Gov_balance'][key] = val;
	},
	addGov_P_Bal: function(key,val){
		this.Fiscal['Gov_Pri_Bal'][key] = val;
	},
	addGov_Rev: function(key,val){
		this.Fiscal['Revenues'][key] = val;
	},
	addGov_Ex: function(key,val){
		this.Fiscal['Expenditures'][key] = val;
	},
	addInterestToGDP: function(key,val){
		this.Fiscal['Interest_To_GDP'][key] = val;
	},
	getDebtToGDP: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Net_Gov_debt_per_GDP'][year];
	},
	getDepositToGDP: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['GG_debtDeposits_GDP'][year];
	},
	getGov_Debt: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Gov_Debt'][year];
	},
	getGov_Bal: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Gov_balance'][year];
	},
	getGov_P_Bal: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Gov_Pri_Bal'][year];
	},
	getGov_Rev: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Revenues'][year];
	},
	getGov_Ex: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Expenditures'][year];
	},
	getInterestToGDP: function(year){
		if(year<1999)
			err_y();
		return this.Fiscal['Interest_To_GDP'][year];
	}
};

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};