$(document).ready(function() {
      $('#map').vectorMap(
		    {map: 'europe_mill_en',
          initial: {
            fill: 'black',
            "fill-opacity": 1,
            stroke: 'none',
            "stroke-width": 0,
            "stroke-opacity": 1
          },
        hover: {
          "fill-opacity": 0.8
        },
        selected: {
          fill: '#311111'
        },
        focusOn:{
          x: 0.6,
          y: 0.55,
          scale: 0.8
        },
        selectedHover: {
        }}
	   );
      $('li.Criteria p').hide();
      $('li.selected p').show();
      $('ul.historical li.selected').prepend('<p class = "arrow">&#9654;</p>');
      $(".data_overview li.selected").prepend('<p class = "arrow">&#9654;</p>');

    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");
        $(this).addClass("selected");
        $(".data_overview ul li p.arrow").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');
        $('li.Criteria p').hide();
        $("ul li.selected p").show();
    });

    $("ul.historical li").click(function(e) {
        $("ul.historical li").removeClass("selected");
        $(this).addClass("selected");
        $("ul.historical li p").remove();
        $(this).prepend('<p class = "arrow">&#9654;</p>');

    });

});
function dataReady(){
  doub = EU;
  return doub;
  //console.log(doub[1].getName()+" "+doub[1].getCPI(2000));
};

