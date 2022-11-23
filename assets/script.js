// DOM elements
var saveBtnEl = $('.saveBtn');
var currentTimeEl = $('#currentDay');
var hourContainerEl = $('#hour-container')

var hourNow = dayjs().hour(23);

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  function displayHourElements() {
    let countHour = 9;
    let realHour = 0;
    let meridiem = "AM";
    for (i = 0; i < 9; i++) { // 9 hours in this workday
      var hourBlockDiv = $('<div>');
      hourBlockDiv.attr('id', "hour-"+countHour);
      // checking AM or PM for each element created
      if (countHour < 12) {
        realHour = countHour;
        countHour++;
      } else if (countHour === 12) {
        meridiem = "PM";
        realHour = 12;
        countHour++;
      } else {
        meridiem = "PM";
        realHour = countHour - 12;
        countHour++;
      };
      hourBlockDiv.addClass("row time-block")

      // changing color of div through classes
      if (countHour-1 !== hourNow.$H) {
        if (countHour-1 < hourNow.$H) {
          hourBlockDiv.addClass("past");
        } else {
          hourBlockDiv.addClass("future");
        }
      } else {
        hourBlockDiv.addClass("present");
      }
      // if (the counthour is not equal to currenthour)
      // adding example stylization for each element
      hourBlockDiv.html("<div class='col-2 col-md-1 hour text-center py-3'>"+realHour+meridiem+"</div>"+
      "<textarea class='col-8 col-md-10 description' rows='3'> </textarea>"+
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>"
      );
      hourContainerEl.append(hourBlockDiv);
    };

  }

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  function displayCurrentTime() {
    var timerInterval = setInterval(function () {
      var rightNow = dayjs().format('[It is currently] hh:mm:ss a [on] MMM DD, YYYY[.]');
      currentTimeEl.text(rightNow);
    }, 1000);
  }

  // running functions
  displayHourElements();
  displayCurrentTime();
});
