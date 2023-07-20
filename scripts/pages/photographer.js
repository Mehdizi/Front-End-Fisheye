//Mettre le code JavaScript lié à la page photographer.html
const init = async () => {
  // On récupère tous les médias
  const allMedias = await getMedias();
  // On récupère l'ID du photographe à partir du lien de la page
  const photographerId = getPhotographerId();
  // On tri les médias en fonction de l'ID pour récupérer les photos du photographes
  const photographerMedias = getPhotographerMedias(photographerId, allMedias);
  // On récupère les informations personnel du photographe à partir de son ID
  const photographerInformations = await getPhotographerInformations();
  // On return la fonction permettant d'afficher ses informations et ses médias
  const consol = [
    console.log({ allMedias }),
    console.log({ photographerId }),
    console.log({ photographerMedias }),
    console.log({ photographerInformations }),
  ];
  return consol;
  // return createPhotographerPage(photographerInformations, photographerMedias);
};

init();