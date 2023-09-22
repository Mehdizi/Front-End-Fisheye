/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const createHomePhotographerCard = (photographerData) => {
  const card = createDomElement("article", { class: "main-article" });
  // Creation of the <a> tag to redirect to the personal page
  const linkToPersonalPage = createDomElement("a", {
    href: `../../photographer.html?id=${photographerData.id}`,
    class: "main-link",
  });
  linkToPersonalPage.setAttribute("aria-label", `${photographerData.name}`);
  // Creation of the two tag for the profil picture and name of the photographer
  const profilPicture = createDomElement("img", {
    alt: `${photographerData.name}`,
    src: `assets/photographers/${photographerData.portrait}`,
    class: "profil-picture",
  });
  const profilName = createDomElement("h2", {
    class: "profil-name",
  });
  profilName.textContent = photographerData.name;
  // wraping of the previous tag on the link tag
  linkToPersonalPage.append(profilPicture, profilName);
  // Creation of the div to wrap the description tag
  const descriptionDiv = createDomElement("div", {
    class: "description-profil",
  });
  // Creation of the description tag (location, tagline and price)
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
  // wrap description tags in the wrapping div
  descriptionDiv.append(profilLocation, profilTagline, profilPrice);
  // Append the link tag and description tag inside the card
  card.append(linkToPersonalPage, descriptionDiv);
  return card;
};

function displayPhotographerCards(photographers) {
  const photographerMain = document.querySelector(".main-wrapper");
  photographers.forEach((photographer) => {
    const card = createHomePhotographerCard(photographer);
    photographerMain.append(card);
  });
}
