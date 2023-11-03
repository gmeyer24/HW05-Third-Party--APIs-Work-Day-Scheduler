// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $(".saveBtn").on("click", function (event) {
    event.preventDefault();
    console.log(event);
    // gather info
    // time-block element of the clicked button
    var timeBlock = $(this).closest(".time-block");
    // id of the time-block.. what hour
    var timeBlockId = timeBlock.attr("id");
    // user input from the textarea within the same time-block
    var userInput = timeBlock.find("textarea").val();
    // Save the input in local storage using the time-block id as a key

    localStorage.setItem(timeBlockId, userInput);

    console.log(`User input for ${timeBlockId} saved: ${userInput}`);
  });

  // get from local storage and put on page
  for (let i = 9; i < 18; i++) {
    $(`#hour-${i} .description`).val(localStorage.getItem(`hour-${i}`));
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // current hour in 24-hour format
  var currentHour = dayjs().hour();

  // Loop through each time block using the class "time-block"
  $(".time-block").each(function () {
    // Get only the hour from the time block's id ("hour-9" = 9). Change string into an array (split where the  "-"" is) and take the second elment from the new array (1)
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    // Compare the time block hour with the current hour
    if (timeBlockHour < currentHour) {
      // Past hour, apply the "past" class
      $(this).addClass("past");
    } else if (timeBlockHour === currentHour) {
      // Current hour, apply the "present" class
      $(this).addClass("present");
    } else {
      // Future hour, apply the "future" class
      $(this).addClass("future");
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  setInterval(function () {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY: h:mm:ssa");
    //   console.log(currentTime);
    $("#currentDay").text(currentDate);
  }, 1000);
});
