
var csv_data;
function get_detail_data(){
  var params = window.location.search.substring(1).split('&');
  var species = params[0].split('=')[1];
  var island = params[1].split('=')[1];
  con_data = [];
    $.ajax({
    url : 'http://127.0.0.1:5000/detail_data',          
    method: 'GET',
    type: 'json',
    data: {'species':species,'island':island},
    success: function (response) {
      d3.select('#container').html(response);
    },
    error: function (error) {
      console.log(error);
    }
  });
}






$(document).ready(function(){
  get_detail_data();
});