
var web_data,axiscontainer,xaxiscontainer,yaxiscontainer;
var con_data = [];

function call_web_service(){
	con_data = [];
	$.ajax({
		url : 'http://127.0.0.1:5000/data',          
		method: 'GET',
		type: 'json',
		data: {'max':$('#ddlMax').val()},
		success: function (response) {
			//console.log(response);
			web_data = JSON.parse(response);
			for(i = 0; i< Object.keys(web_data.Country).length; i++)
			{
				con_data.push({'Country': web_data.Country[i],'Population':web_data.Population[i]});
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