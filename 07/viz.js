var width = 960;
var height = 500;
var svg,circle,g,eyegroup,leye,reye,ebg,leb,reb;
var hspace = 65,vspace = 50;
var eb_hspace = 
$(document).ready(function(){
	svg = d3.select('svg');
	g = svg.append('g')
			.attr('transform',`translate(${width/2},${height/2})`);
	circle = g.append('circle');
	circle.attr('r',150)
		.attr('fill','yellow');

	eyegroup = g.append('g');
	leye = eyegroup.append('circle')
		.attr('r',15)
		.attr('transform',`translate(${-hspace},${-vspace})`);
	reye = eyegroup.append('circle')
			.attr('r',15)
			.attr('transform',`translate(${hspace},${-vspace})`);


	var arc = arc = d3.arc()
    .innerRadius(90)
    .outerRadius(100)
    .startAngle(3*Math.PI / 2)
    .endAngle(Math.PI / 2);

   	var path = g.append('path')
   				.attr('d',arc);

   	ebg = g.append('g');
   	ebg.transition()
   		.duration(2000)
   		.attr('transform',`translate(${0},${-10})`)
   		.transition()
   		.duration(2000)
   		.attr('transform',`translate(${0},${0})`);

   	leb = ebg.append('rect')
   			.attr('width',25).attr('height',5)
   			.attr('transform',`translate(${-hspace-12},${-vspace-25})`);

   	reb = ebg.append('rect')
   			.attr('width',25).attr('height',5)
   			.attr('transform',`translate(${hspace-12},${-vspace-25})`);

});


/*
var svg,arc,width = 960,height=500,shift=70,geb;
$(document).ready(function(){
	svg = d3.select("svg");
	var circle = svg.append('circle').attr('r',150).style('fill','yellow');
	circle.attr('transform',`translate(${width/2},${height/2})`);
	var leye = svg.append('circle').attr('r',20);
	leye.attr('transform',`translate(${width/2-shift},${height/2-40})`);
	var reye = svg.append('circle').attr('r',20);
	reye.attr('transform',`translate(${width/2+shift},${height/2-40})`);
	arc = d3.arc()
    .innerRadius(0)
    .outerRadius(100)
    .startAngle(Math.PI*3/2)
    .endAngle(Math.PI / 2);

	var path = svg.append('path').attr('d',arc);
	path.attr('transform',`translate(${width/2},${height/2})`);
	geb = svg.append('g');
	geb.attr('transform',`translate(${width/2},${height/2})`);
	var reb = geb.append('rect');
	var leb = geb.append('rect');
	leb.attr('height',5).attr('width',25);
	reb.attr('height',5).attr('width',25);
	leb.attr('transform',`translate(-83,-70)`);
	reb.attr('transform',`translate(+58,-70)`);
	geb.transition().duration(2000).attr('transform',`translate(${width/2},${-10+height/2})`).transition().duration(2000).attr('transform',`translate(${width/2},${height/2})`);
});
*/