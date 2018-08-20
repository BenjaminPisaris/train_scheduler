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
$("#add").on("click", function () {
    var trainName = $("#name").val().trim();
    var trainDest = $("#destination").val().trim();
    var tripTime = $("#frequency").val().trim();
    var trainTime = $("#time").val().trim();

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
    alert("Train added to schedule!");
    //Determine when the next train arrives
    return false;

});

//Create event for adding trains to database and filling the train data table
data.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store data into variables
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;

    var arrivalTime = tFirstTrain.split(":");
    var tTime = moment().hours(arrivalTime[0]).minutes(arrivalTime[1]);
    var maxMoment = moment.max(moment(), tTime);
    var tMinutes;
    var tArrival;


    //if the first train is later today, set the arrival time to the first departure
    if (maxMoment === tTime) {
        tArrival = tTime.format("hh:mm A");
        tMinutes = tTime.diff(moment(), "minutes");
    } else {
        //Calculate minutes to arrival
        var differenceTimes = moment().diff(tTime, "minutes");
        var tRemainder = differenceTimes % tFrequency;
        tMinutes = tFrequency - tRemainder;
        tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    }
    console.log("tMinutes: ", tMinutes);
    console.log("tArrival: ", tArrival);
    $("#tarble > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});

