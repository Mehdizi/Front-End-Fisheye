// add listener to action on change filter

const addFilter = (medias) => {
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (e) => {
    sortFilter(medias, e.target.value);
    clearMedia();
    return medias.forEach((media, index) => {
      createMediasFeed(media, index);
    });
  });

  const clearMedia = () => {
    const feed = document.querySelector(".medias-feed");
    feed.innerHTML = "";
  };
};

const applyFilter = (medias) => {
  const filter = document.querySelector("#filter");
  sortFilter(medias, filter.value);
};

const sortFilter = (medias, filterValue) => {
  if (filterValue === "popularity") {
    medias.sort((a, b) => b.likes - a.likes);
  } else if (filterValue === "date") {
    medias.sort((a, b) => {
      const formattedDateA = new Date(a.date);
      const formattedDateB = new Date(b.date);
      return formattedDateB - formattedDateA;
    });
  } else if (filterValue === "title") {
    medias.sort((a, b) => a.title.localeCompare(b.title));
  }
};
