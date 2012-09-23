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
      $('p.info').hide();
      $('li.Criteria a>p').hide();
      $('li.selected p.info').show();
      $('li.selected a>p').show();
      $('ul.historical li.selected').prepend("<p>&#9654;</p>");
      $(".data_overview li.selected").prepend("<p>&#9654;</p>");

    $(".data_overview ul li").click(function(e) {
        $(".data_overview li.selected").removeClass("selected");

        $(this).addClass("selected");
        $('p.info').hide();
        $('li.selected p.info').show();
        $('li.Criteria a>p').hide();
        $("li.selected a>p").show();
    });

    $("ul.historical li").click(function(e) {
        $("ul.historical li").removeClass("selected");
        $(this).addClass("selected");
        $("ul.historical li p").remove();
        $(this).prepend("<p>&#9654;</p>");

    });


      // $("li.Criteria").click(function(){
      //     $("ul.Criteria p").hide();
      //     $("li.Criteria selected").removeClass("selected");

      //     $(this).addClass("selected");
      //     var id = $(this).closest("p").attr("class");
      //     $("p.info" + id).show();
      // });


   // $("#tab a").click(function() {

   //    //reset
   //    $(".content").hide();
   //    $("#tab .active").removeClass("active");

   //    //act
   //    $(this).addClass("active")
   //    var id = $(this).closest("li").attr("id").replace("tab","");
   //    $("#content" + id).show();
   //});
});
function dataReady(){
  doub = EU;
  return doub;
  //console.log(doub[1].getName()+" "+doub[1].getCPI(2000));
};

