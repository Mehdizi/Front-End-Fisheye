/* eslint-disable no-undef */
async function init() {
  const photographers = await getPhotographers();
  displayPhotographerCards(photographers);
}

init();
