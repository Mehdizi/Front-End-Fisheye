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
  personalCardDescription.appendChild(photographerName);
  personalCardDescription.appendChild(photographerLocation);
  personalCardDescription.appendChild(photographerTagline);

  // On crée la balise img pour afficher le portrait
  const photographerPicture = createDomElement("img", {
    class: "photographer-portrait",
    alt: `Portrait de ${photographerInfos.name}`,
    src: `assets/photographers/${photographerInfos.portrait}`,
  });
  // On ajoute la balise img dans la div dédié au portrait
  personalCardPortrait.appendChild(photographerPicture);

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
  const mediaLikeIcone = createDomElement("i", { class: "media-like-icone" });
  likeWrapper.appendChild(mediaLike);
  likeWrapper.appendChild(mediaLikeIcone);

  const mediaDescriptionWrapper = createDomElement("div", {
    class: "media-description-wrapper",
  });
  mediaDescriptionWrapper.appendChild(mediaTitle);
  mediaDescriptionWrapper.appendChild(likeWrapper);

  mediaCard.appendChild(mediaContent());
  mediaCard.appendChild(mediaDescriptionWrapper);
  feed.appendChild(mediaCard);
};

const displayPhotographerMediasFeed = async () => {
  const mediasFiltred = await getPhotographerMedias();
  // const filter = document.querySelector("#filter");
  // filter.addEventListener("change", (e) => {
  //   console.log("change", e.currentTarget.value);
  //   if (e.currentTarget.value === "popularity") {
  //     mediasFiltred.sort((a, b) => a.likes - b.likes);
  //     console.log("ordre des likes", mediasFiltred);
  //     return mediasFiltred;
  //   } else if (e.currentTarget.value === "date") {
  //     mediasFiltred.sort((a, b) => {
  //       const formattedDateA = new Date(a.date);
  //       const formattedDateB = new Date(b.date);
  //       return formattedDateB - formattedDateA;
  //     });
  //     console.log("ordre des date", mediasFiltred);
  //     return mediasFiltred;
  //   } else {
  //     mediasFiltred.sort((a, b) => a.title.localeCompare(b.title));
  //     console.log("ordre des noms", mediasFiltred);
  //     return mediasFiltred;
  //   }
  // });
  // Recuperation of the photographer's medias
  // const photographerMedias = await getPhotographerMedias();
  // filteredMedias(photographerMedias);
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
  const likeIcone = createDomElement("i");
  likesDiv.appendChild(likesNumber);
  likesDiv.appendChild(likeIcone);
  const dailyPrice = createDomElement("p", { class: "daily-price" });
  dailyPrice.innerText = `${photographerInfos.price}€/jour`;

  mainDiv.appendChild(likesDiv);
  mainDiv.appendChild(dailyPrice);
};

const displayLikesCounter = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  const totalLikes = await getTotalLikes();
  createLikesCounter(photographerInfos, totalLikes);
};
