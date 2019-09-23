$(document).ready(function() {

    var firebaseConfig = {
      apiKey: "AIzaSyBVluUOPmJyDmwJp9rCnO5dRUIDSQs1U2E",
      authDomain: "trains-2a05d.firebaseapp.com",
      databaseURL: "https://trains-2a05d.firebaseio.com",
      projectId: "trains-2a05d",
      messagingSenderId: "542654922116",
      appId: "1:542654922116:web:decda5be73473f954f31d1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
    let database = firebase.database();
    let ref = database.ref('trains');
    ref.on('value', gotData, errData);
  
    function gotData(data) {
      let trains = data.val();
      let keys = Object.keys(trains);
      $('#timeTable tbody').empty();
      console.log(keys);
  
      for (i = 0; i < keys.length; i++) {
        let k = keys[i];
        let dTrain = trains[k].trainName;
        let dDestination = trains[k].trainDestination;
        let dTrainArrival = trains[k].trainFirstTime;
        let dFrequency = trains[k].frequency;
        let frequencyDate = dFrequency;
        let dateFormat = "HH:mm";
        let theDate = moment(dTrainArrival, dateFormat);
        let untilNextArrival = theDate.diff(moment(), "minutes");
  
        console.log('Until Next Arrival: ' + untilNextArrival);
        console.log('the date to now: ' + theDate.toNow());
  
        let newDisplay = '<tr><td>' + dTrain + '</td><td>' + dDestination + '</td><td>' + dFrequency + '</td><td>' + theDate.toNow() + '</td><td>' + untilNextArrival + '</td></tr>';
  
        $('#timeTable').append(newDisplay);
  
        console.log(dTrain, dDestination, dFrequency);
      }
  
    }
  
    function errData(err) {
      console.log('error: ' + err);
  
    }
  
    let randomDate = "07/23/2019";
    let randomFormat = "MM/DD/YYYY"
    let convertedDate = moment(randomDate, randomFormat);
  
    console.log(convertedDate.format("MM/DD/YYYY"));
    console.log(convertedDate.format("MMM Do, YYYY hh:mm:ss"));
    console.log(convertedDate.format("X"));
  
    console.log(convertedDate.toNow());
    console.log(convertedDate.diff(moment(), "years"));
    console.log(convertedDate.diff(moment(), "days"));
    console.log(convertedDate.diff(moment(), "months"));
  
    let newDate = moment('02/14/2001', randomFormat);
    console.log(convertedDate.diff(newDate, "days"));
  
    let docTime = $('#currentTime');
    let trainName = "";
    let trainDestination = "";
    let trainFirstTime = 0;
    let frequency = 0;
  
    docTime.text(moment().format('LTS'));
  
    $('#buttonSubmit').on('click', function(event) {
      event.preventDefault();
  
      trainName = $('#trainNameInput').val().trim();
      trainDestination = $('#destinationInput').val().trim();
      trainFirstTime = $('#firstTimeInput').val().trim();
      frequency = $('#frequencyInput').val().trim();
  
      $('#trainNameInput').val('');
      $('#destinationInput').val('');
      $('#firstTimeInput').val('');
      $('#frequencyInput').val('');
  
  
      database.ref('/trains').push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirstTime: trainFirstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  
      console.log(trainName, trainDestination, trainFirstTime, frequency);
  
      database.ref('/trains/').on('child_added', function(snapshot) {
  
        let sv = snapshot.val();
  
        console.log(sv.trainName);
        console.log(sv.trainDestination);
        console.log(sv.trainFirstTime);
        console.log(sv.frequency);
        console.log(sv.dateAdded);
  

      }, function(errorObjects) {
        console.log('errors handled: ' + errorObject.code);
      });
  
      database.ref('/trains/').orderByChild('dateAdded').limitToLast(1).on('child_added', function(snapshot) {
      });
  
    });
  });