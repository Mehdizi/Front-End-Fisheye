function displayPhotographerCards(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  // console.log("displayData1 ", photographers);

  photographers.forEach((photographer) => {
    const card = createHomePhotographerCard(photographer);
    photographersSection.appendChild(card);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  // console.log("init photographer ", photographers);
  displayPhotographerCards(photographers);
}

init();

// Recupère les photographes getPhotographers
// Recupère les médias  getMedias // getMediaByPhotographerId
// Recupère les médias d'un photographe via son ID

// Composer les éléments d'UI via les données qu'on récupère
