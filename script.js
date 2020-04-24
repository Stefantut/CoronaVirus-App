const endpoint = "https://api.covid19api.com/stats";
const stats = {};

fetch(endpoint, {
  method: "GET",
})
  .then((blob) => blob.json())
  .then((data) => {
    stats = data;
  })
  .catch((err) => {
    console.log(err);
  });
