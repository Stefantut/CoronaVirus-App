const summaryEndpoint = "https://api.covid19api.com/summary";

const global = document.querySelector(".summary-global");
const newConfirmed = global.querySelector(".global__box--newconfirmed");
const newDeaths = global.querySelector(".global__box--newdeaths");
const newRecovered = global.querySelector(".global__box--newrecovered");
const totalConfirmed = global.querySelector(".global__box--totalconfirmed");
const totalDeaths = global.querySelector(".global__box--totaldeaths");
const totalRecovered = global.querySelector(".lobal__box--totalrecovered");
let summary = {};

// function fetchApi(apiLink) {
//   fetch(apiLink, {
//     method: "GET",
//   })
//     .then((blob) => blob.json())
//     .then((data) => {
//       summary = data;
//
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

const promise = fetchApi(summaryEndpoint).then((data) => {
  summary = data;
  newConfirmed.textContent = summary.Global.NewConfirmed;
});
