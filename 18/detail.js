
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
      $('.dataframe').addClass('table table-striped');
      $('.dataframe').addClass('sortable');
       $('.dataframe').attr('id','dtable');
       table = document.getElementById('dtable');
      sorttable.makeSortable(table);
    },
    error: function (error) {
      console.log(error);
    }
  });
}


function search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dtable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[6];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}



$(document).ready(function(){
  get_detail_data();
});