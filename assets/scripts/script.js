
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
  data.ref().on("value", function(snapshot) {
    //Log data received from Firebase
    console.log(snapshot.val());
    //append table rows with data to table
  });

  //push completed form to firebase
  //store all inputs to a variable
  $("#add").on("click", function() {
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