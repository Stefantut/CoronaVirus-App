const summaryEndpoint = "https://api.covid19api.com/summary";

let summary = {};

function fetchApi(apiLink) {
  fetch(apiLink, {
    method: "GET",
  })
    .then((blob) => blob.json())
    .then((data) => {
      summary = data;
    })
    .catch((err) => {
      console.log(err);
    });
}

fetchApi(summaryEndpoint);
