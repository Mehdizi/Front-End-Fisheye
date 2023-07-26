// const filteredMedias = async () => {
//   const mediasFiltred = await getPhotographerMedias();
//   const filter = document.querySelector("#filter");
//   filter.addEventListener("change", (e) => {
//     console.log("change", e.currentTarget.value);
//     if (e.currentTarget.value === "popularity") {
//       mediasFiltred.sort((a, b) => a.likes - b.likes);
//       console.log("ordre des likes", mediasFiltred);
//       return mediasFiltred;
//     } else if (e.currentTarget.value === "date") {
//       mediasFiltred.sort((a, b) => {
//         const formattedDateA = new Date(a.date);
//         const formattedDateB = new Date(b.date);
//         return formattedDateB - formattedDateA;
//       });
//       console.log("ordre des date", mediasFiltred);
//       return mediasFiltred;
//     } else {
//       mediasFiltred.sort((a, b) => a.title.localeCompare(b.title));
//       console.log("ordre des noms", mediasFiltred);
//       return mediasFiltred;
//     }
//   });
// };
