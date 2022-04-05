
var web_data,axiscontainer,xaxiscontainer,yaxiscontainer;
var con_data = [];

function call_web_service(){
	con_data = [];
	$.ajax({
		url : 'http://127.0.0.1:5000/car_data',          
		method: 'GET',
		type: 'json',
		data: {'max':$('#ddlMax').val()},
		success: function (response) {
			//console.log(response);
			web_data = JSON.parse(response);
			for(i = 0; i< Object.keys(web_data.mpg).length; i++)
			{
				var obj = {'mpg': web_data.mpg[i],'cylinders':web_data.cylinders[i]};
				obj.displacement = web_data.displacement[i];
				obj.horsepower = web_data.horsepower[i];
				obj.weight = web_data.weight[i];
				obj.acceleration = web_data.acceleration[i];
				obj.year = web_data.year[i];
				obj.origin = web_data.origin[i];
				obj.name = web_data.name[i];
				con_data.push(obj);
			}
			render(con_data);
		},
		error: function (error) {
			console.log(error);
		}
	});
} 


function reloadGraph(){
	max = $('#ddlMax').val();
}



var svg;
var height,width,yscale,innerheight,innerwidth;
var margin = {left:70,right:20,top:40,bottom:20};

render = data => {

	var xval = d => d.horsepower;
	var yval = d => d.weight;
	xscale = d3.scaleLinear()
		.domain(d3.extent(data,xval))
		.range([0,innerwidth]);

	yscale = d3.scaleLinear()
		.domain(d3.extent(data,yval))
		.range([0,innerheight]);

	yscale2 = d3.scaleLinear()
		.domain(d3.extent(data,yval))
		.range([innerheight,0]);

	g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)
	
	var greccontainer = g.append('g')
	greccontainer.selectAll('circle').data(data)
	.enter()
	.append('circle')
	.attr('cx',d => xscale(xval(d)))
	.attr('cy',d => innerheight-yscale(yval(d)))
	.attr('r',10);

	axiscontainer = g.append('g');
	xaxiscontainer = axiscontainer.append('g');
	xaxiscontainer.append('g').call(d3.axisLeft(yscale2));

	yaxiscontainer = axiscontainer.append('g');
	yaxiscontainer.append('g').attr('transform',`translate(${0},${innerheight})`).call(d3.axisBottom(xscale));

	axiscontainer.append(xaxiscontainer);
	axiscontainer.append(yaxiscontainer);
};

var js_data;
function reload(){
	d3.select('svg').html('');
	svg = d3.select('svg');
	height = +svg.attr('height');
	width = +svg.attr('width');
	innerwidth = width - margin.left - margin.right;
	innerheight = height - margin.top - margin.bottom;
	call_web_service();
}

$(document).ready(function(){
	reload();
});