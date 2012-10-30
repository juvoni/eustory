


  function getInternetExplorerVersion()
  // Returns the version of Internet Explorer or a -1
  // (indicating the use of another browser).
  {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
    }
    return rv;
  };

  function checkVersion_Init()
  {
    var ver = getInternetExplorerVersion();
    var text = '3D disabled due to incompatibility';
    if ( ver >= 0.0 && ver <=8.0){
      $infoToClick.remove();
      $three_p.remove();
      $three.html('<p class = "sadInfo">'+text+'</p>'+'<hr>'+'<img class ="sad"src="images/sad_ie.gif" alt="Sad Ie"></img>');
      $three.css({width:'300px', height: '170px',marginTop:'115px'});
    }
    else if(ver >= 9.0 ||ver <= -1){
      $map.one("click", function(event) {
        $infoToClick.remove();
        $Conid.show();
        $Conid.css('width','90');
        threeD = new threeSet();
      });
    }
};

var currentYear = 1999;
var indic = "economy";

function setYear(year){
  currentYear = year;
};
function setIndicator(ind){
  indic = ind;
};
function convert(num){
  num = +num || '';
  num = (num>0)?num+0.6:num;
  num = (num<0)?0.2:num;
  num = (num==0)?0.4:num;
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
      case 0:renderE+=formatCurrency(obj[location].getPerCapita(year));
      break;
      case 1:renderE+=obj[location].getGDP_per_capita(year);
      break;
      case 2:renderE+=formatCurrency(obj[location].getNomGDP(year))+"B";
      break;
      case 3:renderE+=obj[location].getReal_GDP_G(year);
      break;
      case 4:renderE+=obj[location].getBank_Claim_res(year);
      break;
      case 5:renderE+=(obj[location].getNFPE(year))?obj[location].getNFPE(year):"--";
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

function displayAllFiscal(obj,year){
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
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getELiabilities(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
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
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getRatingHistorical(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
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

function renderBy(id,obj,year){
  switch(id){
    case "economy": displayAllEconomy(obj,year);
    break;
    case "fiscal": displayAllFiscal(obj,year);
    break;
    case "external": displayAllExternal(obj,year);
    break;
    case "rating": displayAllRating(obj,year);
    break;
  }
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
function updateColor(id){
  var val;
  switch(id){
    case "economy": val = 3;
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
  function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
  return (((sign)?'':'-') + '$' + num);
}

  function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
    cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
  return (((sign)?'':'-') + '$' + num);
}

