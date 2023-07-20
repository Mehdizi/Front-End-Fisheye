async function getMedias() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    const medias = data.media;
    return medias;
  } else {
    throw "Impossible de charger les données.";
  }
}

const getPhotographerId = () => {
  const searchParams = window.location.search;
  const urlParams = new URLSearchParams(searchParams);
  const id = urlParams.get("id");
  return id;
};

const getPhotographerMedias = (photographerId, allMedias) => {
  const filteredMedias = allMedias.filter(
    (media) => media.photographerId === +photographerId
  );
  filteredMedias.forEach((media) => {
    createMediasFeed(media);
  });
  return filteredMedias;
};

const getPhotographerInformations = async () => {
  const photographers = await getPhotographers();
  const id = getPhotographerId();
  console.log("photographers", { photographers });
  console.log("id", { id });
  const personalInformations = photographers.filter(
    (photographer) => photographer.id === +id
  );
  personalInformations.forEach((photographeInfos) => {
    createPhotographerPersonalCard(photographeInfos);
    console.log("perso info name :", photographeInfos.name);
  });
  console.log("perso info :", personalInformations);
  return personalInformations;
};

const createPhotographerPersonalCard = (photographerInfos) => {
  const mainDiv = document.querySelector(".photograph-header");
  const personalCardDescription = document.createElement("div");
  const personalCardPortrait = document.createElement("div");
  personalCardDescription.classList.add("photographer-medias-card-description");

  const description = `
  <h2>${photographerInfos.name}</h2>
  <span>${photographerInfos.country}, ${photographerInfos.city}</span>
  <span>${photographerInfos.tagline}</span>
  `;
  const portrait = `<img class="photographer-portrait" alt="Portrait de ${photographerInfos.name}" src="assets/photographers/${photographerInfos.portrait}" >`;
  personalCardDescription.innerHTML = description;
  personalCardPortrait.innerHTML = portrait;
  mainDiv.insertAdjacentElement("afterend", personalCardPortrait);
  mainDiv.insertAdjacentElement("beforebegin", personalCardDescription);
};

const createMediasFeed = (media) => {
  const feed = document.querySelector(".medias-feed");
  const mediaCard = document.createElement("div");
  mediaCard.classList.add("photographer-medias-card");
  if (media.image) {
    const card = `
    <img alt="${media.title}" src="assets/medias/${media.image}">
    <h2>${media.title}</h2>
    `;
    mediaCard.innerHTML = card;
    feed.append(mediaCard);
  } else {
    const card = `
    <video alt="${media.title}" src="assets/medias/${media.video}">
    <h2>${media.title}</h2>
    `;
    mediaCard.innerHTML = card;
    feed.append(mediaCard);
  }
};
