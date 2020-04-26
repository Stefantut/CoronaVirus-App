const summaryEndpoint = "https://api.covid19api.com/summary";

const globalList = document.querySelector(".summary-global");
let globalSummary;
// works with fetch api as well
// function fetchApi(apiLink) {
//   fetch(apiLink, {
//     method: "GET",
//   })
//     .then((blob) => blob.json())
//     .then((data) => {
//       summary = data;
//       newConfirmed.textContent = summary.Global.NewConfirmed;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
// fetchApi(summaryEndpoint);

// Used async/await to retrieve api data
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
const updateApi = window.setInterval(updateValues, 50000);
