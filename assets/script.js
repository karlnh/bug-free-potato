// DOM elements
var saveBtnEl = $('.saveBtn');
var currentTimeEl = $('#currentDay');
var hourContainerEl = $('#hour-container')
var timeBlockEl = $('#time-block')

var hourNow = dayjs().hour(23); // 24 hour time

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // on page load, generates hour divs and colors them.
  function renderHourElements() {
    let countHour = 9;
    let realHour = 0;
    let meridiem = "AM";
    for (i = 0; i < 9; i++) { // 9 hours in the workday
      var hourBlockDiv = $('<div>');
      hourBlockDiv.addClass("row time-block");
      hourBlockDiv.attr('id', "hour-"+countHour);
      // checking AM or PM for each element created:
      if (countHour < 12) { // before noon
        realHour = countHour;
        countHour++;
      } else if (countHour === 12) { // noon
        meridiem = "PM";
        realHour = 12;
        countHour++;
      } else { // afternoon
        meridiem = "PM";
        realHour = countHour - 12;
        countHour++;
      };
      // changing color of div through classes:
      if (countHour-1 !== hourNow.$H) {
        if (countHour-1 < hourNow.$H) {
          hourBlockDiv.addClass("past");
        } else {
          hourBlockDiv.addClass("future");
        }
      } else {
        hourBlockDiv.addClass("present");
      }
      // adding example stylization for each element:
      hourBlockDiv.html(
      "<div class='col-2 col-md-1 hour text-center py-3'>" + realHour+meridiem + "</div>" +
      "<textarea class='col-8 col-md-10 description' rows='3'> </textarea>" +
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

  // Bubbles event listener to parent element in order to affect any saveBtnEl
  hourContainerEl.on('click', '.btn', function (event) {
    console.log("clicked!");
    btnClicked = $(event.target);

    function saveTask() {
      console.log(btnClicked.parent()[0].id);
      console.log(btnClicked.parent().children("textarea")[0].value);
    };
    
    saveTask();
    // get id of which save button container is being clicked; use data attributes for assigning and reading values?
    // get the text of that container too;
    // save that to local storage.
    // Somehow uses event.target.(thing)
    // Check out Module 5 Activity 9 for examples.
  })
  

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // displays the current date/time in page header.
  function displayCurrentTime() {
    var timerInterval = setInterval(function () {
      var rightNow = dayjs().format('[It is currently] hh:mm:ss a [on] MMM DD, YYYY[.]');
      currentTimeEl.text(rightNow);
    }, 1000); // updates every second
  }

  // running functions
  displayCurrentTime();
  renderHourElements();
});
