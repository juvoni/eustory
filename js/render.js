var currentYear = 1999;
var indic;
var EUdata = {};
function setYear(year){
  currentYear = year;
};
function setIndicator(ind){
  indic = ind;
};

function convert(num){
  num = +num || 0;
  result = num;
  return result;
};

function displayAllEconomy(obj){
  var renderE;
  var title = "Country";
  var indicator = "Per Capita GDP(US$)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getPerCapita(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};
function displayE(obj,location,year){
  var renderE;
  var conPrefix = countryPrefix(obj,location);
  var countryName = obj[location].getName();
  var indicators = ['Per capita GDP (US$)','Real GDP per capita (% change)','Nominal GDP (bil. $)','Real GDP growth (%)','Bank claims on resident<br>non-govt. sectors / GDP','Oth DC claims on private & NFPEs (% change)'];

  renderE+="<ul class = 'CountryInformation'><li><span class = 'prefix'>"+conPrefix+"</span><br>";
  renderE+="<span class='cTitle'>"+countryName+"</span><li>";
  for(var i = 0; i<indicators.length;i++){
    renderE+="<li><span class='indiTitle'>"+indicator[i]+<"<br><span class = 'indiValue'>";
    switch(i){
      case 0:renderE+=obj[location].getPerCapita(year);
      break;
      case 1:renderE+=obj[location].getGDP_per_capita(year);
      break;
      case 2:renderE+=obj[location].getNomGDP(year);
      break;
      case 3:renderE+=obj[location].getReal_GDP_G(year);
      break;
      case 4:renderE+=obj[location].getBank_Claim_res(year);
      break;
      case 5:renderE+=obj[location].getNFPE(year);
      break;
    }
    renderE+="</span>";
    $('#CountryData').html(renderE);
  }
};
function displayEx(obj,location){
  var renderE;
  var conPrefix = countryPrefix(obj,location);
  var countryName = obj[location].getName();
  var indicators = ['Per capita GDP (US$)','Real GDP per capita (% change)','Nominal GDP (bil. $)','Real GDP growth (%)','Bank claims on resident<br>non-govt. sectors / GDP','Oth DC claims on private & NFPEs (% change)'];

  renderE+="<ul class = 'CountryInformation'><li><span class = 'prefix'>"+conPrefix+"</span><br>";
  renderE+="<span class='cTitle'>"+countryName+"</span><li>";
  for(var i = 0; i<indicators.length;i++){
    renderE+="<li><span class='indiTitle'>"+indicator[i]+<"<br><span class = 'indiValue'>";
    switch(i){
      // case 0:renderE+=obj[location].
      // break;
      // case 1:renderE+=obj[location].
      // break;
      // case 2:renderE+=obj[location].
      // break;
      // case 3:renderE+=obj[location].
      // break;
      // case 4:renderE+=obj[location].
      // break;
      // case 5:renderE+=obj[location].
      // break;
    }
    renderE+="</span>";
    $('#CountryData').html(renderE);
  }
};

function countryPrefix(obj,location){
  var prefix;
  if(obj[location].getName() === "Finland"|| "Austria" || "France" || "Estonia" || "Slovenia" || "Malta" || "Ireland" || "Italy" || "Cyprus" || "Portugal"){
    prefix = "Republic Of";
  }
  else if(obj[location].getName() == "Germany"){
    prefix = "Federal Republic of";
  }
  else if(obj[location].getName() == "Luxembourg"){
    prefix = "The Grand Duchy of";
  }
  else if(obj[location].getName() == "Netherlands"){
    prefix = "The State of";
  }
  else if(obj[location].getName() == "Belgium" || "Spain"){
    prefix = "Kingdom of";
  }
  else if (obj[location].getName() == "Greece"){
    prefix =  "Hellenic Republic";
  }
  return prefix;
};

function displayAllFiscal(obj){
  var renderE;
  var title = "Country";
  var indicator = "G. Government balance % of GDP";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getGG_bal_per_GDP(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};


function displayAllExternal(obj,year){
  if(!year)
    year = currentYear;
  var renderE;
  var title = "Country";
  var indicator = "Net external liabilities(% of CARs)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(year)+"</span><span class = 'value'>"+obj[i].getELiabilities(year)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};

function findObj(obj){
  var location;
  for(var i = 0; i<EU.length;i++){
    if(EU[i].getCode() === code){
      location = i;
      break;
    }
  }
};

function displayAllRating(obj,year){
  if(!year)
    year = currentYear;
  var renderE;
  var title = "Country";
  var indicator = "Rating";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(year)+"</span><span class = 'value'>"+obj[i].getRating(year)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};


function renderBy(id,obj,year){
  switch(id){
    case "economy": displayAllEconomy(obj,year);
    break;
    case "fiscal": displayAllFiscal(obj,year);
    break;
    case "external": displayAllExternal(obj,year);
    break;
    case "rating": displayAllRating(obj,year);
  }
};

function updateColor(id){
  var val;
  switch(id){
    case "economy": val = 2;
    break;
    case "fiscal": val = 0;
    break;
    case "external": val = 1;
    break;
    case "rating": val = 2;
    break;
    default: val = 2;
  }
  return val;
};

