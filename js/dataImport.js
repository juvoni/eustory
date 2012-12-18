
$(document).ready(function() {
	var test = false;
	var $description = $('li.Criteria p');
	var $selectedCountry = $('.selectedCountry');
	var isConSelected = false;
	var imgSrc = "close_v2.png";
	var globalCode;
	var sliderSpeed = 1000;//Milliseconds
	var $histYear = $("ul.historical li");
	var $histYearSel = $("ul.historical li.selected");
	var ieMode;
	var ieVer = getInternetExplorerVersion();

	if(ieVer >=7 && ieVer<9){
		ieMode = true;
	}
	else{
		ieMode = false;
	}


	$selectedCountry.hide();
	$description.hide();
    $("li.selected p").show();
      $histYearSel.prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');
      var myClass = "economy";
      var currentYear = "1999";
	//---------------Blue------------------------Green---------------Red--------------/
	var colorS = [['#ffffff','#1D578C'],['#ffffff','#007C44'],['#ffffff','#E3173E'],['#E3173E','#ffffff']];
	var ratingScore = ["AAA","AA+","AA-","AA","A+","A-","A","BBB+","BBB-","BBB","BB+","BB-","BB","B+","B-","B","CCC+","CCC-","CCC","CC"];
	var colorIndicator;
		colorIndicator = 3;
	var codeArray = [];
	var cCode;

	var EU = [];
	var startYear = 1999;
	var endYear = 2012;
	var mapData = {};
	var indicator;
		indicator = "economy";


	if(ieMode){
		updateImage();
		$('.alert').html("<button type='button' class='close ' data-dismiss='alert'>×</button>"+
			"<strong>Warning!</strong> Versions of Internet Explorer 8 and below are not fully supported."+
			"For a full interactice experience please use a recent version of any of the following browsers"+
			"<a href='http://windows.microsoft.com/en-US/internet-explorer/download-ie' target='_blank'><img src='img/browser/Internet_Explorer_9.png' alt='Internet Explorer 9+' width = '24px' height = '24px'>"+
			"&nbsp;<a href='https://www.google.com/intl/en/chrome/browser/' target='_blank'><img src='img/browser/Google-Chrome-icon.png' alt='Google Chrome' width = '24px' height = '24px'>"+
			"&nbsp;<a href='http://www.mozilla.org/en-US/firefox/new/' target='_blank'><img src='img/browser/firefox-64.png' alt='Firefox' width = '24px' height = '24px'>"
			);
		$(".alert").alert();
	}
	else{
		$('.alert').css("display","none");
	}

    $(".data_overview ul").delegate('li', 'click', function () {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $description.hide();
        $("ul li.selected p").show();
        myClass = $(this).attr("class").split(' ')[1];
        $("ul.historical li.selected").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        setIndicator(myClass);

	        if(!isConSelected){
				renderBy(myClass,EU,currentYear);
	        }
	        else{
				renderSelectedCon(EU,currentYear,myClass,globalCode);
	        }
	        colorIndicator = updateColor(myClass);
	        if(!ieMode){
				updateValue();
				updateC();
			}
			else{
				updateImage();
			}

        var barPosition;
        switch(myClass){
			case "economy": barPosition = '0px 0px';
			break;
			case "fiscal": barPosition = '0px -22px';
			break;
			case "external": barPosition = '0px -44px';
			break;
			case "rating": barPosition = '0px 0px';
			break;
        }
        $('.bar').css("backgroundPosition",barPosition);
        $('span.indiValue').removeClass("rating fiscal economy external");
        $('span.indiValue').addClass(myClass);
    });

    $("ul.historical").delegate('li', 'click', function () {
		var that = this;
		updateHYear(that);
        if(!isConSelected){
			renderBy(myClass,EU,currentYear);
        }
        else{
			renderSelectedCon(EU,currentYear,myClass,globalCode);
			$('span.indiValue').removeClass("rating fiscal economy external");
			$('span.indiValue').addClass(myClass);
        }
        if(!ieMode){
			updateValue();
			updateC();
        }
        else{
			updateImage();
        }
      });


    $(document).click(function(event) {
    if(event.target.nodeName != 'path' && event.target.nodeName != 'svg' && event.target.nodeName != 'IMG'
	&& event.target.nodeName != 'LI' && event.target.nodeName !='SPAN' && event.target.nodeName != 'A'
	&& event.target.nodeName != 'INPUT' && event.target.nodeName !='P') {
	renderBy(myClass,EU,currentYear);
		isConSelected = false;
		$('div#modal_Con').animate({
			top: '-=' + $(this).height(), // factor,
			left: '-=' + $(this).width(), // factor,
			width: $(this).width(),
			opacity: 'hide'
		},500);
		//console.log(event.target.nodeName);
    }
});

	$.ajaxSetup({
		async: false
	});
	$('ul.control').delegate('.play','click',function(){
		var len = $histYear.length;
		var id = $("ul.historical li.selected").index();
		var curPosition;
		curPosition = id;
		var looper;
		var pause_status = false;
		$('ul.control .pause').click(function(){
			pause_status = true;
		});
		looper = setInterval(function(){
					curPosition++;
					if(curPosition >= len){
						curPosition = 0;
					}

					var that = $histYear.eq(curPosition);
					updateHYear(that);
					if(!isConSelected){
						renderBy(myClass,EU,currentYear);
					}
					else{
						renderSelectedCon(EU,currentYear,myClass,globalCode);
						$('span.indiValue').removeClass("rating fiscal economy external");
						$('span.indiValue').addClass(myClass);
					}
					if(!ieMode){
						updateValue();
						updateC();
					}
					else{
						updateImage();
					}

					if(curPosition == len-1 || pause_status){
						clearInterval(looper,sliderSpeed);
					}
		},sliderSpeed);
	});

	$.getJSON('ajax/economic.json', function(data) {
		var n = 0; //Country counter
			$.each(data, function(){
				EU.push(new CountryObj(this['Entity Name'],this['ISO'],this['Data']['Long Term Currency Rating']));
				for(var  i = startYear; i<=endYear; i++){
					EU[n].addNomGDP(i,this['Data']['Nominal GDP (bil. $)'][i]),
					EU[n].addPerCapita(i,this['Data']['Per capita GDP (US$)'][i]),
					EU[n].addReal_GDP_G(i,this['Data']['Real GDP growth (%)'][i]),
					EU[n].addGDP_per_capita(i,this['Data']['Real GDP per capita (% change)'][i]),
					EU[n].addNFPE(i,this['Data']['Oth DC claims on private & NFPEs (% change)'][i]),
					EU[n].addBank_Claim_res(i,this['Data']['Bank claims on resident non-govt. sectors / GDP'][i])
				}
				codeArray.push(EU[n].getCode());
				n++;
			});
	});


	$.getJSON('ajax/fiscal.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
				EU[n].addGG_bal_per_GDP(i,this['Data']['General government balance as % of GDP (%)'][i]),
				EU[n].addChange_GG_debt_per_GDP(i,this['Data']['Change in general government debt as % of GDP'][i]),
				EU[n].addGG_debt_per_GDP(i,this['Data']['Net general government debt as % of GDP (%)'][i]),
				EU[n].addGG_interest_exp_per_revenue(i,this['Data']['General government interest exp. (% of revenues)'][i])
			}
				n++;
		});
	});

	$.getJSON('ajax/external.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
					EU[n].addELiabilities(i,this['Data']['Net external liabilities (% of CARs)'][i]),
					EU[n].addNarrowExToCar(i,this['Data']['Narrow net external debt (% of CARs)'][i])
				}
				n++;
		});

	});
	$.getJSON('ajax/Ratings.json', function(data) {
		var n = 0; //Country counter
		$.each(data, function(){
			for(var  i = startYear; i<=endYear; i++){
				EU[n].addRatingHistorical(i,this[i]);
			}
				n++;
		});
	});
		for(var year = startYear; year<=endYear;year++){
			mapData[year]={};
			for(var i = 1; i<=4;i++){
				switch(i){
					case 1: valI = "economy";
					break;
					case 2: valI = "fiscal";
					break;
					case 3: valI = "external";
					break;
					case 4: valI = "rating";
					break;
				}
				mapData[year][valI]={};
				for(var j = 0; j<17;j++){
					cCode = EU[j].getCode();
					if(valI == "economy")
						mapData[year][valI][cCode] = convert(EU[j].getReal_GDP_G(year));
					else if(valI == "fiscal")
						mapData[year][valI][cCode] = convert(EU[j].getGG_debt_per_GDP(year));
					else if(valI == "external")
						mapData[year][valI][cCode] = convert(EU[j].getELiabilities(year));
					else if(valI == "rating"){
						for(var k = 0; k<ratingScore.length;k++){
							if(EU[j].getRatingHistorical(year) == ratingScore[k]){
								if(k == 0)
									mapData[year][valI][cCode] = 1;
								else
									mapData[year][valI][cCode] = (k/2)+1;
							}

						}
					}
				 }
			}
		}
	displayAllEconomy(EU);
	var factor = 5;
	if(!ieMode){
		$('div#modal_Con').click(function(){
		$(this).animate({
			top: '-=' + $(this).height(), // factor,
			left: '-=' + $(this).width(), // factor,
			width: $(this).width(),
			opacity: 'toggle'
					},500);
	});
		$('#map').vectorMap({
		map: 'europe_mill_en',
			backgroundColor:'#808080',
			regionsSelectable: false,
			regionStyle:{
				 initial: {
					fill: '#c7c7c7',
				    "fill-opacity": 1,
				    stroke: '#cccccc',
				    "stroke-width": 0.5,
				    "stroke-opacity": 1
				},
				hover:{
					stroke: '#414042',
					"stroke-width": 1,
					opacity: 1,
					color: false
				}
			},
			onRegionLabelShow: function(event, label, code) {
				if($.inArray(code, codeArray)!=-1){
					label.text(label.text()+": " +EU[findObj(EU,code)].getRatingHistorical(currentYear));
				}
			},
			onRegionClick: function (event, code) {
				if($.inArray(code, codeArray)!=-1){
					globalCode = code;
					isConSelected = true;
					renderSelectedCon(EU,currentYear,myClass,code);
					//$('.selectedCountry').show().html(EU[findObj(EU,code)].getName()+"<img class = 'closebtn' src='img/"+imgSrc+"' alt=''>");
				    $('span.indiValue').removeClass("rating fiscal economy external");
					$('span.indiValue').addClass(myClass);
					$('div#modal_Con').html("<img src='Countries_PNG/"+code+".png'"+ "width = '560px' height = '495px'>");

					$('div#modal_Con').animate({
						top: '-=' + $(this).height(), // factor,
						left: '-=' + $(this).width(), // factor,
						width: $(this).width(),
						height: $(this).height(),
						opacity: 'toggle'
					},500);
				}
			},
			series:{
				regions:[{
					scale:colorS[colorIndicator],
					attribute: 'fill',
					values: mapData[currentYear][myClass],
					normalizeFunction: 'linear'
				}]
			},
		    focusOn:{
		        x: 0.6,
		        y: 0.55,
		        scale: 0.8
		    }
	 });
	var mapObject = $('#map').vectorMap('get', 'mapObject');
	}
	if(ieMode){
		var filter=[];
		var renderO;
        renderO = "<select id='standard-dropdown' name='standard-dropdown' class='custom-class1 custom-class2' style='width: 150px'>";
        renderO+=  "<option value = '' class='test-class-1' selected='selected'>Select a Country</option>";
        for(var x = 0; x<EU.length; x++)
			filter[x] = EU[x].getName();
		filter.sort();
        for(var x = 0; x<EU.length; x++){
          renderO+="<option value='"+filter[x]+"'>"+filter[x]+"</option>";
        }

        renderO+="</select>";
        $('.optSelect').html(renderO);
		$("select").selectBox().change(function() {
			if($(this).val() == ""){
				isConSelected = false;
				renderBy(myClass,EU,currentYear);
			}
			else if($(this).val()){
				isConSelected = true;
				globalCode = getCodeFromName($(this).val());
				renderSelectedCon(EU,currentYear,myClass,globalCode);
				$('span.indiValue').removeClass("rating fiscal economy external");
				$('span.indiValue').addClass(myClass);
			}

		 });
	}
 var availableTags =  ["Finland","Austria",
 "France","Estonia","Slovenia","Malta","Ireland",
 "Italy","Cyprus","Portugal","Germany","Luxembourg",
 "Greece","Slovak Republic","Belgium","Netherlands","Spain"];


    $( "#tags" ).autocomplete({
        source: function( request, response ) {
                var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
                response( $.grep( availableTags, function( item ){
                    return matcher.test( item );
                }) );
            },
        select: function( event, ui ) {
               // console.log(ui.item.value);
				isConSelected = true;
				globalCode = getCodeFromName(ui.item.value);
				renderSelectedCon(EU,currentYear,myClass,globalCode);
				$('span.indiValue').removeClass("rating fiscal economy external");
				$('span.indiValue').addClass(myClass);
				$('div#modal_Con').html("<img src='Countries_PNG/"+globalCode+".png'"+ "width = '560px' height = '495px'>");
				$('div#modal_Con').animate({
					top: '-=' + $(this).height(), // factor,
					left: '-=' + $(this).width(), // factor,
					width: $(this).width()*factor,
					opacity: 'toggle'
				},500);

        }
    });
	function updateC(){
		mapObject.series.regions[0].setScale(colorS[colorIndicator]);
		jvm.min(mapData[currentYear][myClass]);
		jvm.max(mapData[currentYear][myClass]);
	};

	function updateValue(){
		mapObject.series.regions[0].setValues(mapData[currentYear][myClass]);
	};
	function updateHYear(that){
		$("ul.historical li").removeClass("selected");
        $("ul.historical li p").remove();
        $(that).addClass("selected");
        $(that).prepend('<p class = "arrow">&#9654;</p>');
        $("ul.historical li").removeClass("rating fiscal economy external");
        $("ul.historical li.selected").addClass(myClass);
        var year = $(that).text();
        var remove = year.charAt(0);
        currentYear = year.replace(remove,"");
        setYear(currentYear);
	};

	function getCodeFromName(name){
		for(var i = 0; i<EU.length; i++){
			if(EU[i].getName() === name){
				return EU[i].getCode();
				break;
			}
		}
	};

	function updateImage(){
		//$('#modal_Con').html("<img src='img/SP_Vector_Snapshots/"+myClass+"_"+currentYear+".png'"+ "width = '560px' height = '495px'>").css("display","block");
		var str = 'url(img/SP_Vector_Snapshots/'+myClass+'_'+currentYear+'.png)';
		$('#modal_Con').css('background-image',str);
		$('#modal_Con').css("display","block");
	}

});
