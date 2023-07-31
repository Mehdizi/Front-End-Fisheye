const addFilter = (mediasFiltred) => {
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (e) => {
    console.log("change", e.currentTarget.value);
    if (e.currentTarget.value === "popularity") {
      mediasFiltred.sort((a, b) => b.likes - a.likes);
      console.log("ordre des likes", mediasFiltred);
      clearMedia();
      return mediasFiltred.forEach((media) => {
        createMediasFeed(media);
      });
    } else if (e.currentTarget.value === "date") {
      mediasFiltred.sort((a, b) => {
        const formattedDateA = new Date(a.date);
        const formattedDateB = new Date(b.date);
        return formattedDateB - formattedDateA;
      });
      console.log("ordre des date", mediasFiltred);
      clearMedia();

      return mediasFiltred.forEach((media) => {
        createMediasFeed(media);
      });
    } else {
      mediasFiltred.sort((a, b) => a.title.localeCompare(b.title));
      console.log("ordre des noms", mediasFiltred);
      clearMedia();
      return mediasFiltred.forEach((media) => {
        createMediasFeed(media);
      });
    }
  });

  const clearMedia = () => {
    const feed = document.querySelector(".medias-feed");
    feed.innerHTML = "";
  };
};
