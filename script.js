//Navigation Bar Date Time
function updateTime() {
  let now = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let formattedDate = now.toLocaleDateString("en-US", options);
  let formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  let formattedDateTime = formattedDate + "<br>" + formattedTime;
  document.getElementById("datetime-container").innerHTML = formattedDateTime;
}

updateTime();

setInterval(updateTime, 1000);

//Pocket calendar

// Define the current date
const today = new Date();

// Define the current month and year
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Define the months of the year
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the table body
const calendarBody = document.getElementById("calendar-body");

// Get the month and year header
const monthYearHeader = document.getElementById("month-year");

// Render the calendar
function renderCalendar() {
  // Clear the previous calendar
  calendarBody.innerHTML = "";

  // Set the month and year header
  monthYearHeader.textContent = months[currentMonth] + " " + currentYear;

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the index of the first day of the current month
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Create the rows and cells for the calendar
  let row = document.createElement("tr");
  for (let i = 0; i < firstDayIndex; i++) {
    let cell = document.createElement("td");
    row.appendChild(cell);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let cell = document.createElement("td");
    cell.textContent = i;
    if (
      i === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      cell.classList.add("today");
    }
    row.appendChild(cell);
    if ((i + firstDayIndex - 1) % 7 === 6 || i === daysInMonth) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }
}

// Render the calendar for the current month and year
renderCalendar();

// Add event listeners to the previous and next buttons
document.getElementById("prev-button").addEventListener("click", () => {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  renderCalendar();
});

document.getElementById("next-button").addEventListener("click", () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  renderCalendar();
});

//Slider

function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error("No slider passed in");
  }
  // create some variables for working iwth the slider
  let prev;
  let current;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector(".slides");
  const prevButton = slider.querySelector(".goToPrev");
  const nextButton = slider.querySelector(".goToNext");

  function startSlider() {
    current = slider.querySelector(".current") || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add("current");
    prev.classList.add("prev");
    next.classList.add("next");
  }

  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ["prev", "current", "next"];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === "back") {
      // make an new array of the new values, and destructure them over and into the prev, current and next variables
      [prev, current, next] = [
        // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        // get the next slide, or if it's at the end, loop around and grab the first slide
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener("click", () => move("back"));
  nextButton.addEventListener("click", move);
}
