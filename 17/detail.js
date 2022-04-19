
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
      var table = $(".dataframe");
      table.addClass('table table-striped');
      table.addClass('sortable');
      table.removeClass('dataframe');
      table.attr('id','dtable');
      t = document.getElementById('dtable');
      sorttable.makeSortable(t);
    },
    error: function (error) {
      console.log(error);
    }
  });
}



function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dtable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td1 = tr[i].getElementsByTagName("td")[6];
    td2 = tr[i].getElementsByTagName("td")[4];
    //console.log(tr[i]);
    if (td1 || td2) {
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