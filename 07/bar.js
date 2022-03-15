var width = 960;
var height = 500;
var svg,yscale,xscale,innerHeight;

var render = data => {

	xVal = d => d.Country;
	yVal = d => d.Population;

	yscale = d3.scaleLinear()
				.domain([0, d3.max(data,yVal)])
				.range([0,height]);

	xscale = d3.scaleBand()
				.domain(data.map(xVal))
				.range([0,width]);

	console.log(yscale.range());

	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('x',d => xscale(xVal(d)))
		.attr('y', d => height-yscale(yVal(d)))
		.attr('height',d => yscale(yVal(d)))
		.attr('width',xscale.bandwidth());
};


render2 = data => {

	width = +svg.attr('width');
	height = +svg.attr('height');
	margin = {left:100, right: 20, top:20, bottom:40};
	innerWidth = width - margin.left - margin.right;
	innerHeight = height - margin.top - margin.bottom;


	xVal = d => d.Country
	yVal = d => d.Population
	yscale = d3.scaleLinear()
		.domain([0,d3.max(data, yVal)])
		.range([0,innerHeight]);


	xscale = d3.scaleBand()
		.domain(data.map(xVal))
		.range([0,innerWidth])
		.padding(0.1);

	xaxis = d3.axisBottom();
	yaxis = d3.axisLeft();

	g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);
	g.append('g').call(d3.axisLeft(yscale));
	g.append('g').attr('transform',`translate(${0},${innerHeight+20})`).call(d3.axisTop(xscale));

	g.selectAll('rect').data(data)
		.enter()
		.append('rect')
		.attr('x',d => xscale(xVal(d)))
		.attr('y',d => innerHeight - yscale(yVal(d)))
		.attr('height', d => yscale(yVal(d)) )
		.attr('width',d => xscale.bandwidth());
};


$(document).ready(function(){
	svg = d3.select('svg');

	d3.csv('data.csv').then(data =>{
		data.forEach(d =>{
			d.Population = +d.Population;
		});

		render2(data);
	})

});


