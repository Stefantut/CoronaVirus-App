const summaryEndpoint = "https://api.covid19api.com/summary";

const globalList = document.querySelector(".summary-global");
// console.log(global);
// const newConfirmed = global.querySelector(".global__box--newconfirmed");
// const newDeaths = global.querySelector(".global__box--newdeaths");
// const newRecovered = global.querySelector(".global__box--newrecovered");
// const totalConfirmed = global.querySelector(".global__box--totalconfirmed");
// const totalDeaths = global.querySelector(".global__box--totaldeaths");
// const totalRecovered = global.querySelector(".global__box--totalrecovered");
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

// Used async/await
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
    li.innerHTML += `<span class='title'>${item[0]
      .toString()
      .replace(/([A-Z])/g, " $1")}</span><span class='numbers'>${
      item[1]
    } cases</span>`;
    globalList.appendChild(li);
    listContent = true;
  });
}

// calls the function on page load
updateValues();

// calls the function every 5 minutes
const updateApi = window.setInterval(updateValues, 50000);
