const summaryEndpoint = "https://api.covid19api.com/summary";

const globalList = document.querySelector(".summary-global");
const yearField = document.querySelector(".year");

let globalSummary;

// generate a random color
function randomColor() {
  const colors = ["#87d4c5", "#f3ecc2", "#f6bed6", "#e4f9ff", "#ffcb74"];
  color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

// Retrieve api data
async function fetchApi(apiLink) {
  let response = await fetch(apiLink);
  let data = await response.json();
  return data;
}

let listContent = false;

// Updates all values
function updateValues() {
  const promise = fetchApi(summaryEndpoint).then((data) => {
    //converts object to array
    globalSummary = Object.entries(data.Global);

    // if the list is populated delete all content - fix for api update
    if (listContent) {
      while (globalList.firstChild) {
        globalList.removeChild(globalList.firstChild);
      }
    }

    // add content
    populateList();
  });
}

// Populate list
function populateList() {
  // creates all elements dinamically
  globalSummary.forEach((item) => {
    li = document.createElement("li");
    li.className +=
      "global__box" + " " + "global__box--" + `${item[0].toLowerCase()}`;
    li.style.backgroundColor = `${randomColor()}`;
    li.style.animation = "pulse 1s 2";

    // used replace to add a space
    li.innerHTML += `<span class='title'>${addSpace(
      item[0]
    )}</span><span class='numbers'>${addDots(item[1])}</span>`;
    globalList.appendChild(li);
    listContent = true;
  });
}

function addDots(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function addSpace(number) {
  return number.toString().replace(/([A-Z])/g, " $1");
}

// calls the function on page load
updateValues();

// calls the function every 5 minutes
const updateApi = window.setInterval(updateValues, 500000);

// Display year
function currentYear(item) {
  const date = new Date();
  const year = date.getFullYear();
  item.innerHTML = year;
}

currentYear(yearField);
