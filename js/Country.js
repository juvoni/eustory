function Debt(rt, rd, ra, rs, aoy){

		var rating = rt,
		releaseDate = rd,
		rtgAction = ra,
		rtgSymbol = rs,
		asOfYear = aoy;


		var debtType = "Issuer Credit Rating",
		ratingType = "Foreign Curr(Long-term)",
		unsolicited = "false",
		confid = "N";

		var tierLevel ='',
			ol_Cw = '',
			ol_Cw_Date = '',
			year = ''; 

		var GdP,
			GdpPer,
			GdpPerCapita,
			NetGdpRatio,
			libGdp;
		
		this.GdP = function(g){
			if(!arguments.length)return GdP;
				GdP = g;
				return this;
		};

		this.GdpPer = function(gPer){
			if(!arguments.length)return GdpPer;
				GdpPer = gPer;
				return this;
		};

		this.NetGdpRatio = function(netG){
			if(!arguments.length)return NetGdpRatio;
				NetGdpRatio = netG;
				return this;
		};
		this.NetGdpRatio = function(netG){
			if(!arguments.length)return NetGdpRatio;
				NetGdpRatio = netG;
				return this;
		};
		this.libGdp = function(lGdp){
			if(!arguments.length)return libGdp;
				libGdp = lGdp;
				return this;
		};


		this.rating = function(r){
			if(!arguments.length)return rating;
				rating = r;
				return this;
		};
		this.getYear = function(){
			var year = asOfYear.getUTCFullYear();
		return year;
		};
	

		this.releaseDate = function(rd){
			if(!arguments.length) return releaseDate;
				releaseDate = rd;
				return this;
		};

		this.rtgAction = function(ra){
			if(!arguments.length) return rtgAction;
				releaseDate = rd;
				return this;
		};

		this.rtgSymbol = function(rs){
			if(!arguments.length)return parseInt(rtgSymbol,10);
				rtgSymbol = parseInt(rs,10);
				return this;
		};

		this.debtType = function(dt){
			if(!arguments.length)return debtType;
				debtType = dt;
				return this;
		};

		this.ratingType = function(rt){
			if(!arguments.length)return ratingType;
				ratingType = rt;
				return this;
		};

		this.unsolicited = function(u){
			if(!arguments.length) return unsolicited;
				unsolicited = u;
				return this;
		};
		this.confid	= function(c){
		    if(!arguments.length) return confid;
				confid = c;
				return this;
		};

		this.tierLevel = function(tl){
			if(!arguments.length) return tierLevel;
				tierLevel = tl;
				return this;
		};
		this.ol_Cw = function(ocw){
			if(!arguments.length) return ol_Cw;
				ol_Cw = ocw;
				return this;
		};
		this.ol_Cw_Date = function(ocw_D){
			if(!arguments.length) return ol_Cw_Date;
				ol_Cw_Date = ocw_D;
				return this;
		};

		this.asOfYear = function(aoy){
			if(!arguments.length) return asOfYear;
				asOfYear = aoy;
				return this;
		};
	


return true;

};

function Score(poli, fisc, exter, monet, econ){
	var political = poli,
		fiscal = fisc,
		external = exter,
		monetary = monet,
		economic = econ;

		this.political = function(poli){
			if(!arguments.length)return political;
				political = poli;
			return this;
		};
		this.fiscal = function(fisc){
			if(!arguments.length)return fiscal;
				fiscal = fisc;
			return this;
		};
		this.external = function(exter){
			if(!arguments.length)return external;
				external = exter;
			return this;
		};
		this.monetary = function(monet){
			if(!arguments.length)return monetary;
				monetary = monet;
			return this;
		};
		this.economic = function(econ){
			if(!arguments.length)return economic;
				economic = econ;
			return this;
		};


};
function Economic(ye, gdpC, na){
		var gdpCapita = gdpC, year = ye, name = na;

		this.gdpCapita = function(gdpCapita){
			if(!arguments.length)return gdpCapita;
				this.gdpCapita = gdpCapita;
				return this;
		};

		this.year = function(year){
			if(!arguments.length)return year;
				this.year = year;
				return this;
		};
		this.name = function(name){
			if(!arguments.length)return name;
				this.name = name;
				return this;
		};

};


function Fiscal(y, debtT, n){
		var debtToGdp = debtT,
			year = y,
			name = n;

		this.debtToGdp = function(debtToGdp){
			if(!arguments.length)return debtToGdp;
				this.debtToGdp = debtToGdp;
				return this;
		};

		this.year = function(year){
			if(!arguments.length)return year;
				this.year = year;
				return this;
		};

		this.name = function(name){
			if(!arguments.length)return name;
				this.name = name;
				return this;
		};
};

function External(y, lib, n){
		var year = y,
			libToGdp = lib,
			name = n;
		
	
		this.libToGdp = function(libToGdp){
			if(!arguments.length)return libToGdp;
				this.libToGdp = libToGdp;
				return this;
		};

		this.year = function(year){
			if(!arguments.length)return year;
				this.year = year;
				return this;
		};

		this.name = function(name){
			if(!arguments.length)return name;
				this.name = name;
				return this;
		};
};

function Country( ID, LegalName, cName, cr , deb, sc, valueSco){
	var orgID = ID,
	countryLegalName = LegalName,
	countryName = cName,
	countryRegion = cr;
	var debtB = [];
	var ratingScore = sc;
	var valuRating;
	var economicInfo, fiscalInfo, externalInfo;

	debtB.push(deb);

	var orgType = "Sovereign";
	var latitude,
		longitude,
		countryCode;

	this.debtB = function(deb){
		if(!arguments.length)return debtB;
			//document.write("Debt pushed on...<br>");
			debtB.push(deb);
			return this;
	};

	this.economicInfo = function(econ){
		if(!arguments.length)return economicInfo;
			economicInfo = econ;
			return this;
	};

	this.fiscalInfo = function(fisc){
		if(!arguments.length)return fiscalInfo;
			fiscalInfo = fisc;
			return this;
	};
	this.externalInfo = function(ex){
		if(!arguments.length)return externalInfo;
			externalInfo.push(ex);
			return this;
	};
	this.getDebtOfYear = function(ye){
		var yearInt = parseInt(ye,10);
		var debtResult;
		for(var ix = 0; ix<debtB.length;ix++){
			if(debtB[ix].getYear() === yearInt){
				debtResult = debtB[ix];
				break;
			}
		}
		return debtResult;
	};

	this.hasYear = function(yy){
		var yearIntc = parseInt(yy,10);
		var status;
		for(var i = 0; i<debtB.length;i++){
			if(debtB[i].getYear() === yearIntc){
				status = true;
				break;
			}
			else{
				status = false;
			}
		}
		return status;
	};





	this.orgID = function(id){
		if(!arguments.length)return orgID;
			orgID = id;
			return this;
	};

	this.countryLegalName = function(ln){
		if(!arguments.length)return countryLegalName;
			countryLegalName = ln;
			return this;
	};

	this.countryName = function(cn){
		if(!arguments.length)return countryName;
			countryName = cn;
			return this;
	};

	this.countryRegion = function(cr){
		if(!arguments.length)return countryRegion;
			countryRegion = cr;
			return this;
	};

	this.orgType = function(ot){
		if(!arguments.length)return orgType;
			orgType = ot;
			return this;
	};

	this.latitude = function(lat){
		if(!arguments.length)return latitude;
			latitude = lat;
			return this;
	};

	this.longitude = function(lon){
		if(!arguments.length)return longitude;
			longitude = lon;
			return this;
	};

	this.countryCode = function(cc){
		if(!arguments.length)return countryCode;
			countryCode  = cc;
			return this;
	};

	this.countrySummary = function(){
		document.write("Country:"+this.countryName);
		document.write("OrgID:"+ this.orgID);
	};

	this.getDebt = function(id){
		var key = debtB[id];
		return key;
	};


	this.debtYear = function(y){
		for(var k = 0; k<debtB.length;k++){
			var year = debtB[k].asOfYear().getUTCFullYear();
			if(year === y){
				return k;
				break;
			}
		}
	};
	
	this.debtInfo = function(){
		for(var dHold in debtB){
			document.write(debtB[dHold].rating()+"<br>");
		}
	};
	this.getScore = function(){
		return ratingScore;
	};

	this.getvaluRating = function(){
		return valuRating;
	};

return true;
};
