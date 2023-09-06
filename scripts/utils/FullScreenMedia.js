// DOM element for attribut tabindex
const header = document.querySelector("header a");
const contactButton = document.querySelector(".contact_button");
const filter = document.querySelector("#filter");

function displayModalMedia(index) {
  header.setAttribute("tabindex", "-1");
  contactButton.setAttribute("tabindex", "-1");
  filter.setAttribute("tabindex", "-1");
  const photographerContent = document.querySelectorAll(
    ".photographer-content"
  );
  photographerContent.forEach((media) => {
    media.setAttribute("tabindex", "-1");
  });
  const photographerLike = document.querySelectorAll(".media-like-button");
  photographerLike.forEach((media) => {
    media.setAttribute("tabindex", "-1");
  });
  displayCarousel(index);
}

function closeModalMedia() {
  header.setAttribute("tabindex", "0");
  contactButton.setAttribute("tabindex", "0");
  filter.setAttribute("tabindex", "0");
  const photographerContent = document.querySelectorAll(
    ".photographer-content"
  );
  photographerContent.forEach((media) => {
    media.setAttribute("tabindex", "0");
  });
  const photographerLike = document.querySelectorAll(".media-like-button");
  photographerLike.forEach((media) => {
    media.setAttribute("tabindex", "0");
  });
  const modalMedia = document.querySelector("#full-screen-media");
  modalMedia.remove();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalMedia();
});
