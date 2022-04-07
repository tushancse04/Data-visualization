
var csv_data,con_data,js_data,yaxisGen,yaxiscont;
function get_data(){
	con_data = [];
	console.log('Hello World!');
		$.ajax({
		url : 'http://127.0.0.1:5000/home',          
		method: 'GET',
		type: 'json',
		data: {'max':$('#ddlMax').val()},
		success: function (response) {
			console.log(response);
			csv_data = JSON.parse(response);
			for(i = 0; i < Object.keys(csv_data.Country).length; i++){
				con_data.push({Country:csv_data.Country[i],Population:csv_data.Population[i]});
			}
			reload();
		},
		error: function (error) {
			console.log(error);
		}
	});
}


function reloadGraph(){
	max = $('#ddlMax').val();
}



var svg,csv_data;
var height,width,yscale,innerheight,innerwidth;
var margin = {left:70,right:20,top:50,bottom:20};

render = data => {
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
	yaxisGen = d3.axisLeft(yscale2);
	yaxisGen.ticks(5);
	yaxisGen.tickFormat(d3.format(".2s"));
	yaxiscont = axiscontainer.append('g');
	yaxiscont.call(yaxisGen);
	//yaxiscont.select('.domain').remove();

	axiscontainer.append('g').attr('transform',`translate(${0},${innerheight})`).call(d3.axisBottom(xscale));

};

function reload(){
	d3.select('svg').html('');
	svg = d3.select('svg');
	height = +svg.attr('height');
	width = +svg.attr('width');
	innerwidth = width - margin.left - margin.right;
	innerheight = height - margin.top - margin.bottom;
	render(con_data);
}

$(document).ready(function(){

	get_data();
	max = 10;
	//reload(max);
});