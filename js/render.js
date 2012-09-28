var currentYear = 1999;
var indic = "economy";

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


function displayE(obj,location,year){
  var renderE = "";
  var conPrefix = countryPrefix(obj,location);
  var countryName = obj[location].getName();
  var indC = ['Per capita GDP (US$)','Real GDP per capita (% change)','Nominal GDP (bil. $)','Real GDP growth (%)','Bank claims on resident non-govt. sectors / GDP','Oth DC claims on private & NFPEs (% change)'];

  renderE+="<ul class = 'CountryInformation'><li><span class = 'prefix'>"+conPrefix+"</span><br>";
  renderE+="<span class='cTitle'>"+countryName+"</span><li>";
  for(var i = 0; i<indC.length;i++){
    renderE+="<li class = 'dataSec'><span class='indiTitle'>"+indC[i]+"<br><span class = 'indiValue'>";
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
  }
  $('#CountryData').html(renderE);
};
function displayEx(obj,location,year){
  var renderE = "";
  var conPrefix = countryPrefix(obj,location);
  var countryName = obj[location].getName();
  var indC = ['Narrow net external debt (% of CARs)','Net external liabilities (% of CARs)'];

  renderE+="<ul class = 'CountryInformation'><li><span class = 'prefix'>"+conPrefix+"</span><br>";
  renderE+="<span class='cTitle'>"+countryName+"</span><li>";
  for(var i = 0; i<indC.length;i++){
    renderE+="<li class = 'dataSec'><span class='indiTitle'>"+indC[i]+"<br><span class = 'indiValue'>";
    switch(i){
      case 0:renderE+=obj[location].getNarrowExToCar(year);
      break;
      case 1:renderE+=obj[location].getELiabilities(year);
      break;
    }
    renderE+="</span>";
  }
  $('#CountryData').html(renderE);

};

function displayF(obj,location,year){
  var renderE = "";
  var conPrefix = countryPrefix(obj,location);
  var countryName = obj[location].getName();
  var indC = ['General government balance as % of GDP (%)','Change in general government debt as % of GDP','Net general government debt as % of GDP (%)','General government interest exp. (% of revenues)'];

  renderE+="<ul class = 'CountryInformation'><li><span class = 'prefix'>"+conPrefix+"</span><br>";
  renderE+="<span class='cTitle'>"+countryName+"</span><li>";
  for(var i = 0; i<indC.length;i++){
    renderE+="<li class = 'dataSec'><span class='indiTitle'>"+indC[i]+"<br><span class = 'indiValue'>";
    switch(i){
      case 0:renderE+=obj[location].getGG_bal_per_GDP(year);
      break;
      case 1:renderE+=obj[location].getChange_GG_debt_per_GDP(year);
      break;
      case 2:renderE+=obj[location].getGG_debt_per_GDP(year);
      break;
      case 3:renderE+=obj[location].getGG_interest_exp_per_revenue(year);
      break;
    }
    renderE+="</span>";
  }
      $('#CountryData').html(renderE);
};
function countryPrefix(obj,location){
  var prefix = "";
  var repub = ["Finland","Austria","France","Estonia","Slovenia","Malta","Ireland","Italy","Cyprus","Portugal"]
  if($.inArray(obj[location].getName(), repub)!=-1){
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
  else if(obj[location].getName() == "Belgium" || obj[location].getName() == "Spain"){
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
  var indicator = "Government debt as % of GDP(%)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getGG_debt_per_GDP(currentYear)+"</span></li>";
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

function findObj(obj,code){
  var location;
  for(var i = 0; i<obj.length;i++){
    if(obj[i].getCode() === code){
      location = i;
      break;
    }
  }
  return location;
};
function displayAllEconomy(obj){
  var renderE;
  var title = "Country";
  var indicator = "Real GDP growth (%)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getReal_GDP_G(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
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
  }
  return val;
};
function renderSelectedCon(obj,year,ind,code){
  var floc = findObj(obj,code);
  switch(ind){
    case "economy":displayE(obj,floc,year);
    break;
    case "external": displayEx(obj,floc,year);
    break;
    case "fiscal": displayF(obj,floc,year);
    break;
    default:
  }
};

