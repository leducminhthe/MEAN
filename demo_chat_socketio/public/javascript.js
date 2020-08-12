
//connect server
var socket = io("http://localhost:3000/");
socket.on("server-send-false", function(data){
	alert("Username isset");
});

socket.on("server-send-success", function(data){
	$("#currentUser").html(data);
	$("#chatForm").show(1000);
	$("#loginForm").hide(2000);
});

$(document).ready(function(){
	$("#chatForm").hide();
	$("#loginForm").show();

	$("#btnRegister").click(function() {
		socket.emit("client-send-username", $("#txtname").val());
	});
})
