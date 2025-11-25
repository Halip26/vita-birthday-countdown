// Variable for month lists
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

// Variable for day lists
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// HTML DOM Document Selector Method
const theBirthday = document.querySelector(".birthdayOn");
const timeLeft = document.querySelector(".timeleft");
const formatTime = document.querySelectorAll(".format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// Set the date of vita's birthday
const futureBirthday = new Date(2026, 5, 20, 22, 30, 0);

const year = futureBirthday.getFullYear();
const hours = futureBirthday.getHours();
const minutes = futureBirthday.getMinutes();

let month = futureBirthday.getMonth();
month = months[month];
const weekday = weekdays[futureBirthday.getDay()];
const date = futureBirthday.getDate();

let amPm = "";
if (hours > 12) {
  amPm = "pm";
} else {
  amPm = "am";
}

// Manipulate the text of .birthdayOn
theBirthday.textContent = `Birthday on ${weekday}, ${month} ${date}, ${year} at ${hours}:${minutes} ${amPm}`;

const futureTime = futureBirthday.getTime();

// This function to get reminding time
function getRemindingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Calcualte all values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // Set array values
  const values = [days, hours, minutes, seconds];

  // Manipulate every format element
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  formatTime.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    timeLeft.innerHTML = `<h4 class="expired">Sorry, this birthday date has passed! <br /> But, you can send me a message by clicking the button below 👇 <br/> <a href="https://halip26.github.io/#contact">Birthday wishes </a> </h4>`;
  }
}

// Countdown based on interval
let countdown = setInterval(getRemindingTime, 1000);

// Call the main function
getRemindingTime();

// Get the current year
const currentYear = new Date().getFullYear();

// Set the current year to the span with id "currnetYear"
document.getElementById("currentYear").textContent = currentYear;

// Array of background images
const images = [
  'url("./assets/images/nvitaaaz-08-11-2025-00012.jpg")',
  'url("./assets/images/nvitaaaz_20250630_003447_896.jpg")',
  'url("./assets/images/nvitaaaz_20250630_003450_281.jpg")',
  'url("./assets/images/nvitaaaz_20250630_003501_892.jpg")',
  'url("./assets/images/nvitaaaz_20250630_003510_508.jpg")',
  'url("./assets/images/nvitaaaz-08-11-2025-0001.jpg")',
  'url("./assets/images/nvitaaaz-08-11-2025-00012.jpg")',
  'url("./assets/images/nvitaaaz-08-11-2025-00013.jpg")',
  'url("./assets/images/nvitaaaz-10-11-2025-0001.jpg")',
  'url("./assets/images/nvitaaaz-25-10-2025-0001.jpg")',
];

// Initial index
let index = 0;

// Function to change background image
function changeBackground() {
  document.body.style.backgroundImage = images[index];
  index = (index + 1) % images.length;

  // set delay every 5 seconds
  setTimeout(changeBackground, 3000);
}

// Initial call to start the loop
changeBackground();
