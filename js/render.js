$(function(){
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
});