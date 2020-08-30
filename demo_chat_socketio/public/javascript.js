
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

socket.on("server-send-message", function(data){
	$("#listMessage").append(
		"<div class='message'>"+ data.un + ':' + data.nd + "</div>"
	);
});

socket.on("server-send-all-user", function(data){
	$("#boxContent").html('');
	data.forEach(function(i){
		$("#boxContent").append('<div class="user">'+ i + '</div>');
	})
});

socket.on("server-who-take-message", function(data){
	$("#notification").html(data);
});

socket.on("server-stop-message", function(data){
	$("#notification").html('');
});

$(document).ready(function(){
	$("#chatForm").hide();
	$("#loginForm").show();

	$("#btnRegister").click(function() {
		socket.emit("client-send-username", $("#txtname").val());
	});

	$("#btnLogout").click(function() {
		socket.emit("logout");
		$("#chatForm").hide(1000);
		$("#loginForm").show(2000);
	});

	$("#btnMessage").click(function() {
		socket.emit("client-send-message", $("#txtMessage").val());
		$("#txtMessage").val('');
	});

	$("#txtMessage").focusin(function() {
		socket.emit("client-take-message");
	});

	$("#txtMessage").focusout(function() {
		socket.emit("client-stop-message");
	});
})

