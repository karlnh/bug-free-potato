// DOM elements
var saveBtnEl = $('.saveBtn');
var currentTimeEl = $('#currentDay');
var hourContainerEl = $('#hour-container')
var timeBlockEl = $('#time-block')

var hourNow = dayjs().hour(23); // 24 hour time

let taskJSON = JSON.parse(localStorage.getItem("task"));
if (taskJSON === null) {
  taskJSON = [];
  localStorage.setItem("task", JSON.stringify(taskJSON));
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
    let taskDescription = "";

    for (let i = 0; i < 9; i++) { // 9 hours in the workday
      var hourBlockDiv = $('<div>');
      hourBlockDiv.addClass("row time-block");
      hourBlockDiv.attr('id', "hour-"+countHour);

      // Load relevant index from localStorage.getItem(task[i]);
      for (let j = 0; j < taskJSON.length; j++) {
        if (taskJSON[j].taskNum === hourBlockDiv.attr('id')) { // if there's a match in taskJSON
          console.log("Task found for", taskJSON[j].taskNum+'.');
          taskDescription = taskJSON[j].taskDesc;
        } else { // reset taskDescription
          console.log("No task found.");
          taskDescription = "";
        }
      }

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
      "<textarea class='col-8 col-md-10 description' rows='3'>" + taskDescription + "</textarea>" +
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>"
      );
      hourContainerEl.append(hourBlockDiv);
    };

  }
  // displays the current date/time in page header.

  function displayCurrentTime() {
    currentTimeEl.text(dayjs().format('[It is currently] hh:mm:ss A [on] MMM DD, YYYY[.]')); // inits time display immediately
    var timerInterval = setInterval(function () {
      var rightNow = dayjs().format('[It is currently] hh:mm:ss A [on] MMM DD, YYYY[.]');
      currentTimeEl.text(rightNow);
    }, 1000);
  }
  // Bubbles event listener to parent element in order to affect any saveBtnEl
  function saveToDo() {
    hourContainerEl.on('click', '.btn', function (event) {
      btnClicked = $(event.target);

      let newTask = {
        taskNum: btnClicked.parent()[0].id, //id of parent; should be "hour-#" format
        taskDesc: btnClicked.parent().children("textarea")[0].value // textbox value
      };

      console.log("Attempted task is", newTask);

      if (taskJSON.length === 0) { // if there are no tasks stored:
        console.log("Empty task array.");
        taskJSON.push(newTask);
        console.log("New array:", taskJSON);
        localStorage.setItem("task", JSON.stringify(taskJSON));
      } else { // if there are tasks stored:
        if (newTask.taskDesc === "" || newTask.taskDesc === " ") { // if task description is empty:
          window.alert("No text entered. Nothing has been saved."); // why does clicking this early stop display time from going?
        } else { // if task description is not empty:
          // check if newTask.taskNum matches an existing index's taskJSON[i].taskNum.
          for (let i = 0; i < taskJSON.length; i++) {
            if (newTask.taskNum === taskJSON[i].taskNum) { // if there is a match and there is a previous description,
              console.log("New task description in", newTask.taskNum + " will override old task in", taskJSON[i].taskNum + '.');
              // update old task with new task description.
              taskJSON[i].taskDesc = newTask.taskDesc;
              localStorage.setItem("task", JSON.stringify(taskJSON))
            } else { // else if no match,
              console.log("New task will be saved in", newTask.taskNum + '.');
              taskJSON.push(newTask);
              localStorage.setItem("task", JSON.stringify(taskJSON))
            }
          }
        }
      }
      // Check out Module 5 Activity 9 for examples.
    });
  }

  // running functions
  displayCurrentTime();
  renderHourElements();
  saveToDo();
});
