function displayModalMedia(index) {
  unselectionableDomElements();
  displayCarousel(index);
}

function closeModalMedia() {
  selectionableDomElements();
  const modalMedia = document.querySelector("#full-screen-media");
  if (modalMedia !== null) {
    modalMedia.remove();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalMedia();
});
