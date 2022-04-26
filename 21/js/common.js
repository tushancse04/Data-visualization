function load_menu(){
  $.ajax({ url: 'menu.html', success: function(data) { 
    d3.select('#menu').html(data); 

  } });

}