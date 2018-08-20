// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2bpLSa7JEitaTKwStG1ARPZt1WluP4ts",
    authDomain: "train-schedule-a87ee.firebaseapp.com",
    databaseURL: "https://train-schedule-a87ee.firebaseio.com",
    projectId: "train-schedule-a87ee",
    storageBucket: "train-schedule-a87ee.appspot.com",
    messagingSenderId: "320241316446"
  };
firebase.initializeApp(config);

//set a variable for data pulled
var data = firebase.database();
console.log(data);

//Button for adding trains
$("add").on("click", function() {
    var trainName = $("name").val().trim();
    var trainDest = $("destination").val().trim();
    var tripTime = $("frequency").val().trim();
    var trainTime = $("time").val().trim();

//make a temporary object to store train data
    var newChoo = {
        name: trainName,
        destination: trainDest,
        firstTrain: trainTime,
        frequency: tripTime
    };
//upload newChoo to the firebase
    data.ref().push(newChoo);
//Clear text boxes
$("#name").val("");
$("#destination").val("");
$("#time").val("");
$("#frequency").val("");

//Determine when the next train arrives
return false;

});