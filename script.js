const summaryEndpoint = "https://api.covid19api.com/summary";

const global = document.querySelector(".summary-global");
console.log(global);
const newConfirmed = global.querySelector(".global__box--newconfirmed");
const newDeaths = global.querySelector(".global__box--newdeaths");
const newRecovered = global.querySelector(".global__box--newrecovered");
const totalConfirmed = global.querySelector(".global__box--totalconfirmed");
const totalDeaths = global.querySelector(".global__box--totaldeaths");
const totalRecovered = global.querySelector(".global__box--totalrecovered");
// let summary = {};

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

// Updates all values
function updateValues() {
  fetchApi(summaryEndpoint).then((data) => {
    let globalSummary = data.Global;
    newConfirmed.textContent = globalSummary.NewConfirmed;
    newDeaths.textContent = globalSummary.NewDeaths;
    newRecovered.textContent = globalSummary.NewRecovered;
    totalConfirmed.textContent = globalSummary.TotalConfirmed;
    totalDeaths.textContent = globalSummary.TotalDeaths;
    totalRecovered.textContent = globalSummary.TotalRecovered;

    // console.log(Object.values(summary.Global));
  });
}

// calls the function on page load
updateValues();

// calls the function every 5 minutes
const updateApi = window.setInterval(updateValues, 50000);
