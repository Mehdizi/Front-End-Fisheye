// Part of the photographer's card (create and display)

const createPhotographerPersonalCard = (photographerInfos) => {
  // On crée les deux div qui vont acceuillir la description et le portrait du photographe
  const personalCardDescription = createDomElement("div", {
    class: "photographer-personal-description",
  });
  const personalCardPortrait = createDomElement("div", {
    class: "photographer-div-portrait",
  });
  // On crée les balises de la description du photographe
  const photographerName = createDomElement("h1", {
    class: "photographer-name",
  });
  photographerName.innerText = photographerInfos.name;
  const photographerLocation = createDomElement("p", {
    class: "photographer-location",
  });
  photographerLocation.innerText =
    photographerInfos.city + ", " + photographerInfos.country;
  const photographerTagline = createDomElement("p", {
    class: "photographer-tagline",
  });
  photographerTagline.innerText = photographerInfos.tagline;
  // On ajoute les balises à l'intérieur de la div de description
  personalCardDescription.append(
    photographerName,
    photographerLocation,
    photographerTagline
  );

  // On crée la balise img pour afficher le portrait
  const photographerPicture = createDomElement("img", {
    class: "photographer-portrait",
    alt: `Portrait de ${photographerInfos.name}`,
    src: `assets/photographers/${photographerInfos.portrait}`,
  });
  // On ajoute la balise img dans la div dédié au portrait
  personalCardPortrait.append(photographerPicture);

  // On récupère l'élément du DOM où on va ajouter les informations du photographe
  const mainDiv = document.querySelector(".photographer-header");
  // On ajoute la balise contenant la description et le portrait respectivement avant et après l'élément du DOM récupéré
  mainDiv.insertAdjacentElement("beforebegin", personalCardDescription);
  mainDiv.insertAdjacentElement("afterend", personalCardPortrait);
};

const displayPhotographerPersonalCard = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  createPhotographerPersonalCard(photographerInfos);
};

// Part of the medias feed (create and display)

const createMediasFeed = (media, index) => {
  // Recuperation of DOM element to insert the created HTML
  const feed = document.querySelector(".medias-feed");
  const mediaCard = createDomElement("div", {
    class: "photographer-media-card",
    id: "photographer-media-card",
    onclick: `displayModalMedia(${index})`,
  });
  const mediaContent = () => {
    if (media.image) {
      return createDomElement("img", {
        class: "photographer-content",
        alt: `${media.title}`,
        src: `assets/medias/lowQuality/${media.image}`,
      });
    } else {
      return createDomElement("video", {
        class: "photographer-content",
        alt: `${media.title}`,
        controls: "true",
        width: "400",
        src: `assets/medias/highQuality/${media.video}`,
        type: "video/mp4",
      });
    }
  };
  const mediaTitle = createDomElement("h2", { class: "media-title" });
  mediaTitle.innerText = media.title;
  const likeWrapper = createDomElement("div", { class: "like-wrapper" });
  const mediaLike = createDomElement("p", { class: "media-like" });
  mediaLike.innerText = media.likes;
  const mediaLikeIcone = createDomElement("i", {
    class: "fa-solid fa-heart heart",
  });
  likeWrapper.append(mediaLike, mediaLikeIcone);
  const mediaDescriptionWrapper = createDomElement("div", {
    class: "media-description-wrapper",
  });
  mediaDescriptionWrapper.append(mediaTitle, likeWrapper);

  mediaCard.append(mediaContent(), mediaDescriptionWrapper);
  feed.append(mediaCard);
};

const displayPhotographerMediasFeed = async () => {
  const mediasFiltred = await getPhotographerMedias();
  addFilter(mediasFiltred);
  mediasFiltred.forEach((media, index) => {
    createMediasFeed(media, index);
  });
};

// Part of the modal media (create, display)

const modalMediaContent = (media) => {
  if (media.image) {
    return createDomElement("img", {
      class: "modal-media-content",
      alt: `${media.title}`,
      src: `assets/medias/highQuality/${media.image}`,
    });
  } else {
    return createDomElement("video", {
      class: "modal-media-content",
      alt: `${media.title}`,
      controls: "true",
      width: "400",
      src: `assets/medias/highQuality/${media.video}`,
      type: "video/mp4",
    });
  }
};

const modalMediaTitle = (media) => {
  const title = createDomElement("h2", { class: "modal-media-title" });
  title.innerText = media.title;
  return title;
};

const displayCarousel = async (index) => {
  // recuperation of the photographer's medias
  const mediasFiltred = await getPhotographerMedias();
  // add of the filter on the photographer's medias
  addFilter(mediasFiltred);
  // creation of the carousel with the filtred medias
  createCarousel(mediasFiltred, index);
};

const createCarousel = (medias, index) => {
  let media = medias[index];
  let copyIndex = index;
  const main = document.querySelector("main");
  const modal = createDomElement("div", {
    id: "full-screen-media",
    class: "full-screen-media",
  });
  const cross = createDomElement("img", {
    class: "close-media",
    src: "assets/icons/close.svg",
    alt: "bouton de fermeture du media",
    onclick: "closeModalMedia()",
  });
  const mediaWrapper = createDomElement("div", {
    class: "modal-media-wrapper",
  });
  const indexNum = createDomElement("span", {
    class: "indexNum",
    innerText: `${copyIndex + 1}/${medias.length}`,
  });
  const leftArrow = createDomElement("div", {
    class: "arrow-left",
    events: {
      click: () => {
        if (copyIndex === 0) {
          copyIndex = medias.length - 1;
        } else {
          copyIndex -= 1;
        }
        media = medias[copyIndex];
        mediaWrapper.innerHTML = "";
        mediaWrapper.append(modalMediaContent(media), modalMediaTitle(media));
      },
    },
  });
  const rightArrow = createDomElement("div", {
    class: "arrow-right",
    events: {
      click: () => {
        if (copyIndex === medias.length - 1) {
          copyIndex = 0;
        } else {
          copyIndex += 1;
        }
        media = medias[copyIndex];
        mediaWrapper.innerHTML = "";
        mediaWrapper.append(modalMediaContent(media), modalMediaTitle(media));
      },
    },
  });
  const title = createDomElement("h2");
  title.innerText = media.title;
  modal.append(cross, rightArrow, leftArrow);
  main.append(modal);
  mediaWrapper.append(modalMediaContent(media), modalMediaTitle(media));
  modal.append(mediaWrapper);
};

// Part for the like counter

const displayLikesCounter = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  const totalLikes = await getTotalLikes();
  createLikesCounter(photographerInfos, totalLikes);
};

const createLikesCounter = (photographerInfos, photographerLikes) => {
  const mainDiv = document.querySelector(".like-counter");
  const likesDiv = createDomElement("div", { class: "likes" });
  const likesNumber = createDomElement("p");
  likesNumber.innerText = `${photographerLikes}`;
  const likeIcone = createDomElement("i", { class: "fa-solid fa-heart heart" });
  likesDiv.append(likesNumber, likeIcone);
  const dailyPrice = createDomElement("p", { class: "daily-price" });
  dailyPrice.innerText = `${photographerInfos.price}€/jour`;
  mainDiv.append(likesDiv, dailyPrice);
};
