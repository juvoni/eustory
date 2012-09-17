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
	getNomGDP: function(){
		return this.Economic['Nominal_GDP'];
	}

};
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
//str.replace( /[\s\n\r]+/g, ' ' )
var EU = [];
$(document).ready(function() {

$.getJSON('ajax/economic_data.json', function(data) {

	var n = 0;
		$.each(data, function(){
			var size = 0;
			var startYear = 1999;
			EU.push(new CountryObj(this['Entity Name'],this['ISO'],this['Data']['Long Term Currency Rating']));
			//EU[n].addNomGDP(this['Nominal GDP (bil. $)']);
			//console.log(this['Entity Name']+"<br>");
			size = Object.size(this['Data']['Nominal GDP (bil. $)']);
			//console.log(size);
			for(var  i = startYear; i<=2012; i++){

				console.log(this['Data']['Nominal GDP (bil. $)'][i]);
				//EU[n].addNomGDP(startYear,this['Data']['Nominal GDP (bil. $)'][i]);
			}
			//console.log(new CountryObj(this['Entity Name'],this['ISO'], this['Data']['Long Term Currency Rating']));
			n++;
			//console.log(this['Data']['Nominal GDP (bil. $)'][1999]));
		});
		//console.log(EU[1].getNomGDP());


});

});

