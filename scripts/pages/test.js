async function getMedias() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    const medias = data.media;
    return medias;
  } else {
    throw new Error(
      "Impossible de contacter le serveur pour récupérer les médias"
    );
  }
}

const filteredMedias = async () => {
  const allMediasFiltred = await getMedias();
  const filter = document.querySelector("#filter");
  filter.addEventListener("change", (e) => {
    console.log("change", e.currentTarget.value);
    if (e.currentTarget.value === "popularity") {
      allMediasFiltred.sort((a, b) => a.likes - b.likes);
      console.log("ordre des likes", allMediasFiltred);
    } else if (e.currentTarget.value === "date") {
      allMediasFiltred.sort((a, b) => {
        const formattedDateA = new Date(a.date);
        const formattedDateB = new Date(b.date);
        return formattedDateB - formattedDateA;
      });
      console.log("ordre des date", allMediasFiltred);
    } else {
      allMediasFiltred.sort((a, b) => a.title.localeCompare(b.title));
      console.log("ordre des noms", allMediasFiltred);
    }
  });
};
filteredMedias();
