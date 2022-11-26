// DOM elements
var saveBtnEl = $('.saveBtn');
var currentTimeEl = $('#currentDay');
var hourContainerEl = $('#hour-container')
var timeBlockEl = $('#time-block')

var hourNow = dayjs().hour(23); // 24 hour time

let taskJSON = JSON.parse(localStorage.getItem("task"));
if (taskJSON === null) {
  taskJSON = [];
}

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
      // Load relevant index in localStorage.getItem(task[i]);

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
      // adding stylization for each element:
      hourBlockDiv.html(
      "<div class='col-2 col-md-1 hour text-center py-3'>" + realHour+meridiem + "</div>" +
      "<textarea class='col-8 col-md-10 description' rows='3'> </textarea>" +
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>"
      );
      hourContainerEl.append(hourBlockDiv);
    };

  }
  // displays the current date/time in page header.

  function displayCurrentTime() {
    var timerInterval = setInterval(function () {
      var rightNow = dayjs().format('[It is currently] hh:mm:ss A [on] MMM DD, YYYY[.]');
      currentTimeEl.text(rightNow);
    }, 1000);
  }
  // Bubbles event listener to parent element in order to affect any saveBtnEl
  function saveToDo() {
    hourContainerEl.on('click', '.btn', function (event) {
      console.log("clicked!");
      btnClicked = $(event.target);
      let newTask = {
        taskNum: btnClicked.parent()[0].id, //id of parent; should be "hour-#" format
        taskDesc: btnClicked.parent().children("textarea")[0].value // textbox value
      };
      // checking if textbox is populated:
      if (newTask.taskDesc !== " ") {
      // if the newTask.taskNum is not the same as any newTask.taskNum in taskJSON,
      // taskJSON.push(newTask);
      // else,
      // replace the task value in taskJSON with the newTask.
      // Either way, localStorage.setItem("task", JSON.stringify(taskJSON));
      } else {
        window.alert("No text entered. Nothing has been saved."); // why does clicking this early stop display time from going?
      }
      // Check out Module 5 Activity 9 for examples.
    });
  }

  // running functions
  displayCurrentTime();
  renderHourElements();
  saveToDo();
});
