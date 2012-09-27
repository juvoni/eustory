var currentYear = 1999;
var indic;
var EUdata = {};
function setYear(year){
  currentYear = year;
};
function setIndicator(ind){
  indic = ind;
};

function isDigit(num){
  var isnum = /^\d+$/.test(num);
  return isnum;
};

function convert(num){
  num = Number(num);
  if(typeof num == 'string'){
    result = 0;
  }
  else{
    result = num;
  }
  return result;
};

function displayAllEconomy(obj){
  var renderE;
  var title = "Country";
  var indicator = "Gdp per Capita(US$)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getPerCapita(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};

function displayAllFiscal(obj){
  var renderE;
  var title = "Country";
  var indicator = "GG debt/GDP(%)";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].GG_debt_per_GDP(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};


function displayAllExternal(obj,year){
  if(!year)
    year = currentYear;
  var renderE;
  var title = "Country";
  var indicator = "Net external liabilities";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(year)+"</span><span class = 'value'>"+obj[i].getELiabilities(year)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};
function countryExternal(obj,year){

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

