function displayModalMedia() {
  const media = document.querySelector("#photographer-media-card");
  // console.log(media);
  displayCarousel();
}

function closeModalMedia() {
  const modalMedia = document.querySelector("#full-screen-media");
  modalMedia.remove();
}
