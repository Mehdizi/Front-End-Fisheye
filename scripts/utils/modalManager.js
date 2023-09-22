/* eslint-disable no-unused-vars */
// DOM element to change value of tabindex (-1 => unselectionnable, 0 => selectionnable)
const header = document.querySelector("header a");
const contactButton = document.querySelector(".contact_button");
const filter = document.querySelector("#filter");

const unselectionableDomElements = () => {
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
};

const selectionableDomElements = () => {
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
};
