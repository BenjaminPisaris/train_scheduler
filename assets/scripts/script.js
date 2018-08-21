
//Initialize Firebase
var config = {
  apiKey: "AIzaSyC2bpLSa7JEitaTKwStG1ARPZt1WluP4ts",
  authDomain: "train-schedule-a87ee.firebaseapp.com",
  databaseURL: "https://train-schedule-a87ee.firebaseio.com",
  projectId: "train-schedule-a87ee",
  storageBucket: "train-schedule-a87ee.appspot.com",
  messagingSenderId: "320241316446"
};
firebase.initializeApp(config);
var data = firebase.database();

//Pull the data from Firebase to add to the table
data.ref().on("value", function (snapshot) {
  //Log data received from Firebase
  //console.log(snapshot.val());
  //append table rows with data to table
});

//push completed form to firebase
//store all inputs to a variable
$("#add").on("click", function () {
  var inputName = $("#name").val();
  var inputDest = $("#destination").val();
  var inputTime = $("#time").val();
  var inputFreq = $("#frequency").val();


  

  //store the input variables into a new object
  var uploadMe = {
    destination: inputDest,
    firstTrain: inputTime,
    frequency: inputFreq,
    name: inputName
  }
  console.log(uploadMe);
  //upload the object to FireBase
  data.ref().push(uploadMe);
});

//Append entries to table
data.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());
  //create object to append to table

    //Use moment.js(4000+ lines of code included locally instead of relying on a CDN) to pretty
  //the time up for display and parse it into usable data
  //split the time up by the colon to make an array
  var timeArr = inputTime.split(":");
  var prettyTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maximum = moment.max(moment(), prettyTime);
  var minutes;
  var arrival;


  //If the first train is set to depart after the current time
  //set the arrival to the first train time
  if (maximum === prettyTime) {
    //make the variable format in a 12 hour clock instead of military time
    arrival = prettyTime.format("hh:mm A");
    minutes = prettyTime.diff(moment(), "minutes");
  } else {
    //calculate the difference between the current time and the first train time in minutes
    var difference = moment().diff(prettyTime, "minutes");
    //next, find the modulus of the difference and the frequency,
    var modulus = difference % childSnapshot.val().frequency;
    //find the minutes by subtracting the modulus from the frequency
    minutes = childSnapshot.val().frequency - modulus;

  }


  var dataAppend = $("<tr>").append(
    $("<td>").text(childSnapshot.val().name),
    $("<td>").text(childSnapshot.val().destination),
    $("<td>").text(childSnapshot.val().frequency),
    $("<td>").text(childSnapshot.val().firstTrain)); //MOMENT to fix this


    

  //Append object to table
  $("#appendHere").append(dataAppend);
});

