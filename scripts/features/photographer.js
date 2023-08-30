const createHomePhotographerCard = (photographerData) => {
  const card = createDomElement("article", { class: "main-article" });
  // Création de la balise <a> avec le lien de redirection vers la page photographe
  const linkToPersonalPage = createDomElement("a", {
    href: `../../photographer.html?id=${photographerData.id}`,
    class: "main-link",
  });
  linkToPersonalPage.setAttribute("aria-label", `${photographerData.name}`);
  // Ici on va créer les deux balises permettant d'afficher la photo et le nom du phtographe
  const profilPicture = createDomElement("img", {
    alt: `${photographerData.name}`,
    src: `assets/photographers/${photographerData.portrait}`,
    class: "profil-picture",
  });
  const profilName = createDomElement("h2", {
    class: "profil-name",
  });
  profilName.textContent = photographerData.name;
  // Ici on ajoute les balises Name et Picture à la balise du lien
  linkToPersonalPage.append(profilPicture, profilName);
  // Création de la div qui va wrapper la description du photographe
  const descriptionDiv = createDomElement("div", {
    class: "description-profil",
  });
  // Création des balises permettant d'afficher la localisation, la phrase d'accroche et le prix du photographe
  const profilLocation = createDomElement("p", {
    class: "profil-location",
  });
  profilLocation.innerText =
    photographerData.city + ", " + photographerData.country;
  const profilTagline = createDomElement("p", {
    class: "profil-tagline",
  });
  profilTagline.innerText = photographerData.tagline;
  const profilPrice = createDomElement("p", {
    class: "profil-price",
  });
  profilPrice.innerText = photographerData.price + "€/jour";
  // Ajout des balises précédente dans la div de description
  descriptionDiv.append(profilLocation, profilTagline, profilPrice);
  // Enfin, ajout du lien et de la description dans la balise article de départ
  card.append(linkToPersonalPage, descriptionDiv);
  return card;
};

function displayPhotographerCards(photographers) {
  const photographerMain = document.querySelector(".main-wrapper");
  // console.log("displayData1 ", photographers);
  photographers.forEach((photographer) => {
    const card = createHomePhotographerCard(photographer);
    photographerMain.append(card);
  });
}
