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
	this.Nominal_GDP = {};
	this.Fiscal = {};
	this.IIP = {};

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
			return console.log("Invalid Year");
		return this.Economic['Nominal_GDP'][year];
	}

};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var EU = [];
$(document).ready(function() {

$.getJSON('ajax/economic_data.json', function(data) {

	var n = 0; //Country counter
		$.each(data, function(){
			var size = 0; //Number of Years in record
			var startYear = 1999;
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
		for(var i = 1999; i<=2012; i++){
			console.log(i+":"+EU[0].getNomGDP(i));
			console.log(i+":"+EU[1].getNomGDP(i));
		}

});

});

