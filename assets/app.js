$(document).ready(function(){

var config = {
    apiKey: "AIzaSyBuVdkgynB2UxzpD8F-w_yGnHIMsA2MMNo",
    authDomain: "rock-paper-scissor-multi.firebaseapp.com",
    databaseURL: "https://rock-paper-scissor-multi.firebaseio.com",
    projectId: "rock-paper-scissor-multi",
    storageBucket: "rock-paper-scissor-multi.appspot.com",
    messagingSenderId: "812507757852"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//initial values
var name = "";
var destination ="";
var firstTrain ="";
var frequency = 0;
var nextArrival = 0;
var minsAway = 0;


//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){})

database.ref().on("child_added", function(childsnapshot) {
  var child = childsnapshot.val();

//nextArrival = (moment(child.dataStart).diff(moment(),"months"))*-1;
//nextArrival = (moment(child.dataTime))

//minsAway = worked * child.dataRate;
//minsAway = ()

  var table = $("<tr class = 'table'>");
  $("#table").append(table);
  table.append("<td>" + child.dataName + "</td>");
  table.append("<td>" + child.dataDest + "</td>");
  table.append("<td>" + child.dataFreq + "</td>");
  table.append("<td>" + child.dataArriv + "</td>");
  table.append("<td>" + child.dataMins + "</td>");


  }, function(error) {
    console.log("error");

  });
	
$("#submit").on("click", function() {

	event.preventDefault();

		name = $("#train-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrain = $("#time-input").val().trim();
		frequency = parseInt($("#freq-input").val().trim());

var timeconvert = moment(firstTrain, "HH:mm").subtract(1, "years");
var difference = moment().diff(moment(timeconvert),"minutes");
var remain = difference % frequency;
minsAway = frequency - remain;
var nextTrain = moment().add(minsAway, "mins");
nextArrival = moment(nextTrain).format("hh:mm");
//nextArrival = (moment(start).diff(moment(),"months"))*-1;
//minsAway = month * rate;

  // var table = $("<tr class = 'table'>");
  // $("#table").append(table);
  // table.append("<td>" + name + "</td>");
  // table.append("<td>" + destination + "</td>");
  // table.append("<td>" + frequency + "</td>");
  // table.append("<td>" + nextArrival + "</td>");
  // table.append("<td>" + minsAway + "</td>");


	database.ref().push({
      dataName: name,
      dataDest: destination,
      dataTime: firstTrain,
      dataFreq: frequency,
      dataMins: minsAway,
      dataArriv: nextArrival,
    })

  //empty after submit
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");

	})


//database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
//  var child = snapshot.val();
//  console.log(child);
//}, function(error){
// console.log("error");
//})
})