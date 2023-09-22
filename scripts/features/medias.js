// Part of the photographer's card (create and display)

const createPhotographerPersonalCard = (photographerInfos) => {
  // Recuperation of the DOM element to introduce the data
  const photographerPersonalCard = document.querySelector(
    ".photographer-personal-card"
  );
  // creation of the tag for the description part
  const personalCardDescription = createDomElement("div", {
    class: "photographer-personal-description",
  });
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
  personalCardDescription.append(
    photographerName,
    photographerLocation,
    photographerTagline
  );

  // creation of the tag for the portrait part
  const personalCardPortrait = createDomElement("div", {
    class: "photographer-div-portrait",
  });
  const photographerPicture = createDomElement("img", {
    class: "photographer-portrait",
    alt: ``,
    src: `assets/photographers/${photographerInfos.portrait}`,
  });
  photographerPicture.setAttribute(
    "aria-label",
    `${photographerInfos.portrait}`
  );
  personalCardPortrait.append(photographerPicture);

  // Introduction of the previus part in the DOM element photographer-personal-card
  photographerPersonalCard.prepend(personalCardDescription);
  photographerPersonalCard.insertAdjacentElement(
    "beforeend",
    personalCardPortrait
  );
};

const displayPhotographerPersonalCard = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  createPhotographerPersonalCard(photographerInfos);
  createTitleModalMessage(photographerInfos);
};

// Part for the creation of the personal name on the modal message

const createTitleModalMessage = (photographerInfos) => {
  // Recuperation of the photographer's name for the personalisation of the ContactForm
  const title = createDomElement("h2");
  title.innerHTML = `Contactez moi <br> ${photographerInfos.name}`;
  const headerContactModal = document.querySelector(".header-contact-modal");
  headerContactModal.prepend(title);
  // Recuperation of the ContactForm DOM for the personalisation of the aria-label
  const contactForm = document.querySelector("#contactForm");
  contactForm.setAttribute(
    "aria-label",
    `Contactez-moi ${photographerInfos.name}`
  );
};

// Part of the medias feed (create and display)

const createMediasFeed = (media, index) => {
  // Recuperation of DOM element to insert the created HTML
  const feed = document.querySelector(".medias-feed");
  const mediaCard = createDomElement("article", {
    class: "photographer-media-card",
    id: "photographer-media-card",
  });
  const mediaContent = () => {
    if (media.image) {
      const image = createDomElement("img", {
        class: "photographer-content",
        alt: media.title,
        src: `assets/medias/lowQuality/${media.image}`,
        onclick: `displayModalMedia(${index})`,
        role: "dialog",
        tabindex: "0",
        events: {
          keydown: (e) => {
            if (e.key === "Enter") displayModalMedia(index);
          },
        },
      });
      image.setAttribute("aria-label", `${media.title}`);
      return image;
    } else {
      const video = createDomElement("video", {
        class: "photographer-content",
        alt: media.title,
        controls: "true",
        width: "400",
        src: `assets/medias/highQuality/${media.video}`,
        onclick: `displayModalMedia(${index})`,
        type: "video/mp4",
        role: "dialog",
        tabindex: "0",
        events: {
          keydown: (e) => {
            if (e.key === "Enter") displayModalMedia(index);
          },
        },
      });
      video.setAttribute("aria-label", `${media.title}`);
      return video;
    }
  };

  const mediaTitle = createDomElement("h2", { class: "media-title" });
  mediaTitle.innerText = media.title;

  // Part for the like button and counter

  const likeWrapper = createDomElement("div", { class: "like-wrapper" });
  let counter = media.likes;
  const mediaLikeButton = createDomElement("button", {
    class: "media-like-button",
    events: {
      click: () => {
        if (counter === media.likes) {
          counter = counter + 1;
          mediaLike.innerText = counter;
        } else if (counter > media.likes) {
          counter = counter - 1;
          mediaLike.innerText = counter;
        }
      },
    },
  });
  mediaLikeButton.setAttribute("aria-label", "likes");
  const mediaLike = createDomElement("p", { class: "media-like" });
  mediaLike.innerText = counter;
  const mediaLikeIcone = createDomElement("i", {
    class: "heart fa-solid fa-heart",
  });
  mediaLikeIcone.setAttribute("aria-hidden", "true");
  mediaLikeButton.append(mediaLikeIcone);
  likeWrapper.append(mediaLike, mediaLikeButton);
  const mediaDescriptionWrapper = createDomElement("div", {
    class: "media-description-wrapper",
  });
  mediaDescriptionWrapper.append(mediaTitle, likeWrapper);

  mediaCard.append(mediaContent(), mediaDescriptionWrapper);
  feed.append(mediaCard);
};

const displayPhotographerMediasFeed = async () => {
  const medias = await getPhotographerMedias();
  applyFilter(medias);
  addFilter(medias);
  medias.forEach((media, index) => {
    createMediasFeed(media, index);
  });
};

// Part for the like counter (display, create and increment)

const createLikesCounter = async (photographerInfos, photographerLikes) => {
  let counter = photographerLikes;
  const mainDiv = document.querySelector(".like-counter");
  const likesDiv = createDomElement("div", { class: "likes" });
  const likesNumber = createDomElement("p");
  likesNumber.innerText = counter;
  const mediaLikeButton = document.querySelectorAll(".media-like-button");
  mediaLikeButton.forEach((media) => {
    let increment = 0;
    media.addEventListener("click", () => {
      if (increment === 0) {
        counter = counter + 1;
        likesNumber.innerText = counter;
        increment += 1;
      } else {
        counter = counter - 1;
        likesNumber.innerText = counter;
        increment -= 1;
      }
    });
  });
  const likeIcone = createDomElement("i", {
    class: "heart fa-solid fa-heart ",
  });
  likeIcone.setAttribute("aria-hidden", "true");
  likesDiv.append(likesNumber, likeIcone);
  const dailyPrice = createDomElement("p", { class: "daily-price" });
  dailyPrice.innerText = `${photographerInfos.price} €/jour`;
  mainDiv.append(likesDiv, dailyPrice);
};

const displayLikesCounter = async () => {
  const photographerInfos = await getPhotographerPersonalInformations();
  const getTotalLikes = async () => {
    const photographerMedias = await getPhotographerMedias();
    let totalLikes = 0;
    for (let i = 0; i < photographerMedias.length; i++) {
      totalLikes += photographerMedias[i].likes;
    }
    return totalLikes;
  };
  createLikesCounter(photographerInfos, await getTotalLikes());
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
  const medias = await getPhotographerMedias();
  // add of the filter on the photographer's medias
  applyFilter(medias);
  // creation of the carousel with the filtred medias
  createCarousel(medias, index);
};

const createCarousel = (medias, index) => {
  let media = medias[index];
  let copyIndex = index;
  const main = document.querySelector("main");
  const modalFullScreen = createDomElement("div", {
    id: "full-screen-media",
    class: "full-screen-media",
    role: "dialog",
    tabindex: "0",
  });
  modalFullScreen.setAttribute("aria-label", "image closeup view");
  const crossButton = createDomElement("button", {
    type: "button",
    class: "cross-modal-button",
    id: "cross-button-media",
    onclick: "closeModalMedia()",
  });
  crossButton.setAttribute("aria-labellebdy", "close-dialog");
  crossButton.innerText = "X";
  const mediaWrapper = createDomElement("div", {
    class: "modal-media-wrapper",
  });
  const leftArrow = createDomElement("button", {
    type: "button",
    class: "left-arrow",
    tabindex: "0",
    events: {
      click: () => {
        goToPreviousMedia();
      },
    },
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && modal) {
      goToPreviousMedia();
    }
  });
  leftArrow.setAttribute("aria-label", "Previous media");
  const rightArrow = createDomElement("button", {
    type: "button",
    class: "right-arrow",
    tabindex: "0",
    events: {
      click: () => {
        goToNextMedia();
      },
    },
  });
  rightArrow.setAttribute("aria-label", "Next media");
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" && modal) {
      goToNextMedia();
    }
  });
  const title = createDomElement("h2");
  title.innerText = media.title;
  modalFullScreen.append(crossButton, leftArrow, rightArrow);
  main.append(modalFullScreen);
  mediaWrapper.append(modalMediaContent(media), modalMediaTitle(media));
  modalFullScreen.append(mediaWrapper);

  const goToNextMedia = () => {
    if (copyIndex === medias.length - 1) {
      copyIndex = 0;
    } else {
      copyIndex = copyIndex + 1;
    }
    changeMedia(copyIndex);
  };

  const goToPreviousMedia = () => {
    if (copyIndex === 0) {
      copyIndex = medias.length - 1;
    } else {
      copyIndex -= 1;
    }

    changeMedia(copyIndex);
  };

  const changeMedia = (copyIndex) => {
    media = medias[copyIndex];
    mediaWrapper.innerHTML = "";
    mediaWrapper.append(modalMediaContent(media), modalMediaTitle(media));
  };
};
