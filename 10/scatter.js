
var csv_data,con_data,js_data,yaxisGen,yaxiscont;
function get_data(){
	con_data = [];
	console.log('Hello World!');
		$.ajax({
		url : 'http://127.0.0.1:5000/car_data',          
		method: 'GET',
		type: 'json',
		data: {'max':$('#ddlMax').val()},
		success: function (response) {
			console.log(response);
			csv_data = JSON.parse(response);
			for(i = 0; i < Object.keys(csv_data.mpg).length; i++){
				var obj = {mpg:csv_data.mpg[i],cylinders:csv_data.cylinders[i]};
				obj.displacement = csv_data.displacement[i];
				obj.horsepower = csv_data.horsepower[i];
				obj.weight = csv_data.weight[i];
				obj.acceleration = csv_data.acceleration[i];
				obj.year = csv_data.year[i];
				obj.origin = csv_data.origin[i];
				con_data.push(obj);
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
	var xval = d=> d.mpg;
	var yval = d => d.weight;
	/*
	xscale = d3.scalePoint()
	.domain(data.map(yval))
	.range([0,innerwidth])
	.padding(.1);
*/
	xscale = d3.scaleLinear()
		.domain([d3.min(data,yval),d3.max(data,yval)])
		.range([0,innerwidth]);

	yscale = d3.scaleLinear()
		.domain([0,d3.max(data,xval)])
		.range([0,innerheight]);

	yscale2 = d3.scaleLinear()
		.domain([0,d3.max(data,xval)])
		.range([innerheight,0]);

	g = svg.append('g')
		.attr('transform',`translate(${margin.left},${margin.top})`)
	
	var greccontainer = g.append('g')
	greccontainer.selectAll('circle').data(data)
	.enter()
	.append('circle')
	.attr('cx',d => xscale(yval(d)))
	.attr('cy',d => innerheight-yscale(xval(d)))
	.attr('r',10);

	axiscontainer = g.append('g');
	yaxisGen = d3.axisLeft(yscale2);
	yaxisGen.ticks(5);
	yaxisGen.tickFormat(d3.format(".2s"));
	yaxiscont = axiscontainer.append('g');
	yaxiscont.call(yaxisGen);
	//yaxiscont.select('.domain').remove();

	axiscontainer
		.append('g').attr('transform',`translate(${0},${innerheight})`)
		.call(d3.axisBottom(xscale));

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