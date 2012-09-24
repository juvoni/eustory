$(document).ready(function() {
      $('li.Criteria p').hide();
      $('li.selected p').show();
      $('ul.historical li.selected').prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');
      var myClass;
      var currentYear = 1999;
    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $('li.Criteria p').hide();
        $("ul li.selected p").show();
        myClass = $(this).attr("class").split(' ')[1];
        $("ul.historical li.selected").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        setIndicator(myClass);
        console.log(myClass);
    });

    $("ul.historical li").click(function(e) {
        $("ul.historical li").removeClass("selected");
        $(this).addClass("selected");
        $("ul.historical li p").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $(this).removeClass("rating fiscal economy external").addClass(myClass);
        var year = $(this).text();
        var remove = year.charAt(0);
        currentYear = year.replace(remove,"");
        setYear(currentYear);
        console.log(currentYear);
      });
    $("#showHide").click(function(){
      var theDiv = $('#toggle');
      if(theDiv.css('display') == 'none'){
        $(this).next().css('display','block');
        $(this).text("Hide");
      }
      else{
        $(this).next().css('display','none');
        $(this).text("Show");
      }
    });

});
var currentYear = 1999;
var indic;

function setYear(year){
  currentYear = year;
};
function setIndicator(ind){
  indic = ind;
};
function dataReady(){
  doub = EU;
  return doub;
  //console.log(doub[1].getName()+" "+doub[1].getCPI(2000));
};
function isDigit(num){
  var isnum = /^\d+$/.test(num);
  return isnum;
};
function neq(num){
    var re = /.*(\s+(.*)\s+).*/;
    var result = num.replace(re, "$1");
    if(num.indexOf("." !=-1)){
      result = true;
    }
    return result;
};
function convert(num){
  temp = num.replace(/\,/g,'');
  var result;
  if(isDigit(temp)){
      result = temp.parseInt(temp,10);
      // result = result.parseInt(result,10);
  }
  else if(temp.indexOf("(") !=-1){
      result = "-";
      result+=temp.substring(1,temp.length-1);
      //result = result.parseFloat(result,10);
    }
  else if(temp.indexOf("-")!=-1){
      result = result.parseInt(result,10);
  }
  else{
    result = 0;
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
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getDebtToGDP(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};


function displayAllExternal(obj){
  var renderE;
  var title = "Country";
  var indicator = "Net external liabilities";
  renderE = "<ul><li><span class='title'>"+title+"</span><span class = 'indicator'>"+indicator+"</span>";
  for(var i = 0; i<obj.length; i++){
    renderE+="<li class = 'conlist'><span class = 'Cname'>"+obj[i].getName(currentYear)+"</span><span class = 'value'>"+obj[i].getELiabilities(currentYear)+"</span></li>";
  }
  renderE+="</ul>";
  $('#CountryData').html(renderE);
};

function renderBy(id){
  switch(id){
    case "economy": displayAllEconomy(obj);
    break;
    case "fiscal": displayAllFiscal(obj);
    break;
    case "external": displayAllExternal(obj);
    break;
  }
};