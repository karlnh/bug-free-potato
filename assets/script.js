// DOM elements:
var saveBtnEl = $('.saveBtn');
var currentTimeEl = $('#currentDay');
var hourContainerEl = $('#hour-container')
var timeBlockEl = $('#time-block')
var currentHour = dayjs().get('hour');
// Initialize localStorage if empty:
let taskJSON = JSON.parse(localStorage.getItem("task"));
if (taskJSON === null) {
  taskJSON = [];
  localStorage.setItem("task", JSON.stringify(taskJSON));
}
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Generate hour divs and color them:
  function renderHourElements() {
    let countHour = 9;
    let realHour = 0;
    let meridiem = "AM";
    let taskText = "";

    for (let i = 0; i < 9; i++) { // 9 hours in the workday
      taskText = "";
      var hourBlockDiv = $('<div>');
      hourBlockDiv.addClass("row time-block");
      hourBlockDiv.attr('id', "hour-"+countHour);

      // Load relevant index from localStorage.getItem(task[i]):
      for (let j = 0; j < taskJSON.length; j++) { // iterating through saved tasks
        if (taskJSON[j].taskNum === hourBlockDiv.attr('id')) { // if there's a match in the saved tasks
          console.log("Task found for", taskJSON[j].taskNum + '.');
          taskText = taskJSON[j].taskDesc; // add it to the task description
        }
      }
      // Check AM or PM for each element created:
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
      if (countHour-1 !== currentHour) {
        if (countHour-1 < currentHour) {
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
      "<textarea class='col-8 col-md-10 description' rows='3'>" + taskText + "</textarea>" +
      "<button class='btn saveBtn col-2 col-md-1' aria-label='save'><i class='fas fa-save' aria-hidden='true'></i></button>"
      );
      hourContainerEl.append(hourBlockDiv);
    };

  }
  // Display the current date/time in page header:
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
      // Check if there were tasks saved in that taskNum and replace the value at that key if so.
      function blendTasks() {
        for (let i = 0; i < taskJSON.length; i++) { 
          if (taskJSON[i].taskNum === newTask.taskNum) { // if new task's value is the same as stored task's value,
            taskJSON.splice(i, 1); // remove 1 item at index i. works even if it's empty since we push below anyway!
          }
        }
      taskJSON.push(newTask); // either way, add the task
      }
      if (taskJSON.length === 0) { // if there are no tasks stored:
        taskJSON.push(newTask); // just add the new task.
      } else { // if there are tasks stored:
        if (newTask.taskDesc === "" || newTask.taskDesc === " ") { // if task description is empty:
          window.alert("No text entered. Nothing has been saved.");  // why does clicking this early stop display time from going?
        } else {
          blendTasks();
        }
      }
      localStorage.setItem("task", JSON.stringify(taskJSON));
      taskJSON = JSON.parse(localStorage.getItem("task"));
    });
  }

  // running functions
  renderHourElements();
  displayCurrentTime();
  saveToDo();
});
