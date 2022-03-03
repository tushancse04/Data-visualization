$( document ).ready(function() {
    const svg = d3.select("svg");

    const height = +svg.attr('height');
    const width = +svg.attr('width');
    const wspace = 100;
    const hspace = 50;
    const circle = svg.append('circle')
	    .attr('cx',width/2 + wspace)
	    .attr('cy',height/2 + hspace)
	    .attr('r',height/4)
	    .attr('fill','yellow')
	    .attr('stroke','black')
	    .attr('stroke-width',2);

	const g = svg.append('g')
		.attr('transform',`translate(${width/2 + wspace},${height/2 + hspace})`);


	const lefteye = g.append('circle')
	    .attr('r',15)
	    .attr('cx',-(wspace-30))
	    .attr('cy',-hspace+10);

	const righteye = g.append('circle')
	    .attr('r',15)
	    .attr('cx',wspace-30)
	    .attr('cy',-hspace+10);
	const path = g.append('path')
				.attr('d',d3.arc()({
					  innerRadius: 0,
					  outerRadius: 90,
					  startAngle: 3*Math.PI / 2,
					  endAngle: Math.PI / 2
				}));
});
