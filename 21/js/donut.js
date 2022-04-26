
var csv_data,con_data,dt;
function get_data(){
  con_data = [];
    $.ajax({
    url : 'http://127.0.0.1:5000/donut_data',          
    method: 'GET',
    type: 'json',
    data: {},
    success: function (response) {
      csv_data = JSON.parse(response);
      for(i = 0; i < Object.keys(csv_data.rows).length; i++){
        con_data.push({name:csv_data.species[i] + '/' + csv_data.island[i],value:csv_data.rows[i]});
      }
      load(con_data);
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function get_detail_data(){
  con_data = [];
    $.ajax({
    url : 'http://127.0.0.1:5000/detail_data',          
    method: 'GET',
    type: 'json',
    data: {},
    success: function (response) {
      //console.log(response);
      csv_data = JSON.parse(response);
      for(i = 0; i < Object.keys(csv_data.rows).length; i++){
        con_data.push({name:csv_data.species[i] + '/' + csv_data.island[i],value:csv_data.rows[i]});
      }
      load(con_data);
    },
    error: function (error) {
      console.log(error);
    }
  });
}




function load(con_data){
      var data = con_data;
    var text = "";

    var width = 260;
    var height = 260;
    var thickness = 40;
    var duration = 750;

    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#chart")
    .append('svg')
    .attr('class', 'pie')
    .attr('width', width)
    .attr('height', height);

    var g = svg.append('g')
    .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

    var arc = d3.arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

    var pie = d3.pie()
    .value(function(d) { return d.value; })
    .sort(null);

    var path = g.selectAll('path')
    .data(pie(data))
    .enter()
    .append("g")
    .on("mouseover", function(d) {
          let g = d3.select(this)
            .style("cursor", "pointer")
            .style("fill", "black")
            .append("g")
            .attr("class", "text-group");
     
          g.append("text")
            .attr("class", "name-text")
            .text(`${d.data.name}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.2em');
      
          g.append("text")
            .attr("class", "value-text")
            .text(`${d.data.value}`)
            .attr('text-anchor', 'middle')
            .attr('dy', '.6em');
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current))
            .select(".text-group").remove();
        })
      .append('path')
      .attr('d', arc)
      .attr('fill', (d,i) => color(i))
      .on("mouseover", function(d) {
          d3.select(this)     
            .style("cursor", "pointer")
            .style("fill", "black");
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .style("cursor", "none")  
            .style("fill", color(this._current));
        })
       .on("click", function(d){
        d = d.data.name.split('/') //Adelie/Dream
        var url = "http://localhost:8080/detail.html?species=" + d[0] + '&island=' + d[1];;
        window.location = url;    
    })
    .each(function(d, i) { this._current = i; });


    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .text(text);
}

function load_menu(){
  $.ajax({ url: 'menu.html', success: function(data) { 
    d3.select('#menu').html(data); 

  } });

}

$(document).ready(function(){
  get_data();
  //get_detail_data();
});