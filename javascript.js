/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

var config = {
    apiKey: "AIzaSyBVUUOmXlp1pVlvkVla31-sscqxmIEBp6g",
    authDomain: "tran4-8c0ba.firebaseapp.com",
    databaseURL: "https://tran4-8c0ba.firebaseio.com",
    projectId: "tran4-8c0ba",
    storageBucket: "tran4-8c0ba.appspot.com",
    messagingSenderId: "450445180662"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#employee-name-input").val().trim();
    var destination = $("#role-input").val().trim();
    var firstTrain = $("#start-input").val().trim();
    var frequency = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newEmp = {
      trainname: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newEmp);
  
    // Logs everything to console
    console.log(newEmp.trainname);
    console.log(newEmp.destination);
    console.log(newEmp.firstTrain);
    console.log(newEmp.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#employee-name-input").val("");
    $("#role-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainname;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
  
    // Prettify the employee start
    //var firstTrainPretty = moment.unix(firstTrain).format("h:mm");
  
  //var firstTrainPretty = moment(firstTrain).format('MMMM Do YYYY, h:mm:ss a' );
  //console.log("First Train pretty: " + firstTrainPretty );
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    //var empMonths = moment().diff(moment(firstTrain, "X"), "months");
   // console.log(empMonths);
  
    // Calculate the total billed rate
   // var empBilled = empMonths * frequency;
   // console.log(empBilled);
  
    // Add each train's data into the table
    

    var tFrequency = frequency;

    console.log("First train: " + firstTrain);
  // Time is 3:30 AM
  var firstTime = firstTrain;

  console.log("First time: " + firstTime);

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log("First time converted: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("h:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var nextTrainTime = moment(nextTrain).format("h:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("h:mm"));

  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency
     + "</td><td>" + firstTrain + "</td><td>" + tMinutesTillTrain + "</td><td>" + nextTrainTime  );


 
  });
  
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  