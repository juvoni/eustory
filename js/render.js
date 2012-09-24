$(document).ready(function() {
      $('li.Criteria p').hide();
      $('li.selected p').show();
      $('ul.historical li.selected').prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');
      var myClass;
    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $('li.Criteria p').hide();
        $("ul li.selected p").show();
        myClass = $(this).attr("class").split(' ')[1];
        $("ul.historical li.selected").removeClass("rating economy fiscal external");
        $("ul.historical li.selected").addClass(myClass);
        console.log(myClass);
    });

    $("ul.historical li").click(function(e) {
        $("ul.historical li").removeClass("selected");
        $(this).addClass("selected");
        $("ul.historical li p").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $(this).removeClass("rating economy fiscal external").addClass(myClass);
    });

});
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
 // $('#')
};
