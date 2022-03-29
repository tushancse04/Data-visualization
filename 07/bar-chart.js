function reloadGraph(){
	max = $('#ddlMax').val();
}



var svg;
var height,width,yscale,innerheight,innerwidth;
var margin = {left:70,right:20,top:20,bottom:20};

render = data =>{
	xscale = d3.scaleBand()
	.domain(data.map(d => d.Country))
	.range([0,innerwidth])
	.padding(.1);

	yscale = d3.scaleLinear()
		.domain([0,d3.max(data,d=>d.Population)])
		.range([0,innerheight]);

	yscale2 = d3.scaleLinear()
		.domain([0,d3.max(data,d=>d.Population)])
		.range([innerheight,0]);

	g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)
	
	var greccontainer = g.append('g')
	greccontainer.selectAll('rect').data(data)
	.enter()
	.append('rect')
	.attr('x',d => xscale(d.Country))
	.attr('y',d => innerheight-yscale(d.Population))
	.attr('height',d => yscale(d.Population))
	.attr('width',xscale.bandwidth());

	axiscontainer = g.append('g');
	axiscontainer.append('g').call(d3.axisLeft(yscale2));
	axiscontainer.append('g').attr('transform',`translate(${0},${innerheight})`).call(d3.axisBottom(xscale));

};

function reload(max){
	svg = d3.select('svg');
	height = +svg.attr('height');
	width = +svg.attr('width');
	innerwidth = width - margin.left - margin.right;
	innerheight = height - margin.top - margin.bottom;
	d3.csv('data.csv').then(data =>{
		data.forEach(d =>{
			d.Population = +d.Population;
		});
		render(data);
	});
}

$(document).ready(function(){
	max = 10;
	reload(max);
});