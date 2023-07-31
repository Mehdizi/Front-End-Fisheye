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

const createMediasFeed = (media) => {
  // Recuperation of DOM element to insert the created HTML
  const feed = document.querySelector(".medias-feed");
  const mediaCard = createDomElement("div", {
    class: "photographer-media-card",
    onclick: "displayModalMedia()",
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
  // For each object of the photographerMedias array create a card
  mediasFiltred.forEach((media) => {
    createMediasFeed(media);
  });
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

const displayLikesCounter = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  const totalLikes = await getTotalLikes();
  createLikesCounter(photographerInfos, totalLikes);
};

const createCarousel = (media) => {
  const modal = document.querySelector("#full-screen-media");
  const mediaWrapper = createDomElement("div", {
    class: "modal-media-wrapper",
  });
  const mediaContent = () => {
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
  const mediaTitle = createDomElement("h2", { class: "modal-media-title" });
  mediaWrapper.append(mediaContent(), mediaTitle);
  modal.append(mediaWrapper);
};

const displayCarousel = async () => {
  const mediasFiltred = await getPhotographerMedias();
  addFilter(mediasFiltred);
  console.log(mediasFiltred);
  createCarousel(mediasFiltred[0]);
  // essayer de faire un addEventListener sur les flèches pour bouger en fonction de l'index des obj dans le tableau mediasFiltred
};
