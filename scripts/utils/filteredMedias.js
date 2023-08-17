const addFilter = (mediasFiltred) => {
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (e) => {
    if (e.currentTarget.value === "popularity") {
      mediasFiltred.sort((a, b) => b.likes - a.likes);
    } else if (e.currentTarget.value === "date") {
      mediasFiltred.sort((a, b) => {
        const formattedDateA = new Date(a.date);
        const formattedDateB = new Date(b.date);
        return formattedDateB - formattedDateA;
      });
    } else if (e.currentTarget.value === "title") {
      mediasFiltred.sort((a, b) => a.title.localeCompare(b.title));
    }
    clearMedia();
    return mediasFiltred.forEach((media, index) => {
      createMediasFeed(media, index);
    });
  });

  const clearMedia = () => {
    const feed = document.querySelector(".medias-feed");
    feed.innerHTML = "";
  };
};
