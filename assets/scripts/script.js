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
  data.ref().on("value", function(snapshot) {
      console.log(snapshot.val());
  });