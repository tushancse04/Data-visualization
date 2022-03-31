
var data;
$.ajax({
	url : 'http://127.0.0.1:5000/home',          
	method: 'GET',
	type: 'json',
	data: {},
	success: function (response) {
		console.log(response);
		data = response;
	},
	error: function (error) {
		console.log(error);
	}
});
