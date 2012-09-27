function CountryObj(name, code, rating){
	this.name = name;
	this.code = code;
	this.rating = rating;

	this.Economic = {
		'Per_capita_GDP':{},
		'Real_GDP_per_capita':{},
		'Nominal_GDP':{},
		'Real_GDP_growth':{},
		'Oth_DC_claims_on_private_NFPEs':{},
		'Bank_claims_on_resident_non_govt_sectors':{}
	};
	this.Fiscal = {
		'GG_bal_per_GDP':{},
		'Change_GG_debt_per_GDP':{},
		'GG_debt_per_GDP':{},
		'GG_interest_exp_per_revenue':{}
	};
	this.External = {
		'eLiabilities':{},
		'NarrowExToCar':{}
	};
	this.Rating = {
		'historicalRating':{}
	};

};
function err_y(year){
	if(year<1999)
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
	//--------------------Rating Functions--------------------------------//
	addRatingHistorical: function(key,val){
		this.Rating['historicalRating'][key]= val;
	},
	getRatingHistorical: function(year){
		err_y(year);
		return this.Rating['historicalRating'][year];
	},
	//--------------------Economic Functions--------------------------------//
	addNomGDP: function(key,val){
		this.Economic['Nominal_GDP'][key] = val;
	},
	addPerCapita: function(key,val){
		this.Economic['Per_capita_GDP'][key] = val;
	},
	addReal_GDP_G: function(key,val){
		this.Economic['Real_GDP_growth'][key] = val;
	},
	addGDP_per_capita: function(key,val){
		this.Economic['Real_GDP_per_capita'][key] = val;
	},
	addNFPE: function(key,val){
		this.Economic['Oth_DC_claims_on_private_NFPEs'][key] = val;
	},
	addBank_Claim_res: function(key,val){
		this.Economic['Bank_claims_on_resident_non_govt_sectors'][key] = val;
	},
	getNomGDP: function(year){
			err_y(year);
		return this.Economic['Nominal_GDP'][year];
	},
	getPerCapita: function(year){
			err_y(year);
		return this.Economic['Per_capita_GDP'][year];
	},
	getReal_GDP_G: function(year){
			err_y(year);
		return this.Economic['Real_GDP_growth'][year];
	},
	getGDP_per_capita: function(year){
		err_y(year);
		return this.Economic['Real_GDP_per_capita'][year];
	}
	getNFPE: function(year){
			err_y(year);
		return this.Economic['Oth_DC_claims_on_private_NFPEs'][year];
	},
	getBank_Claim_res: function(year){
			err_y(year);
		return this.Economic['Bank_claims_on_resident_non_govt_sectors'][year];
	},
	//--------------------Fiscal Functions--------------------------------//
	addGG_bal_per_GDP: function(key,val){
		this.Fiscal['GG_bal_per_GDP'][key] = val;
	},
	addChange_GG_debt_per_GDP: function(key,val){
		this.Fiscal['Change_GG_debt_per_GDP'][key] = val;
	},
	addGG_debt_per_GDP: function(key,val){
		this.Fiscal['GG_debt_per_GDP'][key] = val;
	},
	addGG_interest_exp_per_revenue: function(key,val){
		this.Fiscal['GG_interest_exp_per_revenue'][key] = val;
	},
	getGG_bal_per_GDP: function(year){
			err_y(year);
		return this.Fiscal['GG_bal_per_GDP'][year];
	},
	getChange_GG_debt_per_GDP: function(year){
			err_y(year);
		return this.Fiscal['Change_GG_debt_per_GDP'][year];
	},
	getGG_debt_per_GDP: function(year){
			err_y(year);
		return this.Fiscal['GG_debt_per_GDP'][year];
	},
	getGG_interest_exp_per_revenue: function(year){
			err_y(year);
		return this.Fiscal['GG_interest_exp_per_revenue'][year];
	},
	//--------------------External Functions--------------------------------//
	addELiabilities: function(key,val){
		this.External['eLiabilities'][key] = val;
	},
	addNarrowExToCar: function(key,val){
		this.External['NarrowExToCar'][key] = val;
	},
	getELiabilities: function(year){
			err_y(year);
		return this.External['eLiabilities'][year];
	},
	getNarrowExToCar: function(year){
			err_y(year);
		return this.External['NarrowExToCar'][year];
	}
};

