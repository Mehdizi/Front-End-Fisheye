async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    const photographers = data.photographers;
    return photographers;
  } else {
    throw new Error("Impossible de contacter le serveur");
  }
}

const createHomePhotographerCard = (photographerData) => {
  const card = document.createElement("article");
  const photographeCard = `
  <a href="http://127.0.0.1:5501/photographer.html?id=${photographerData.id}">
  <img alt="Portrait de ${photographerData.name}" src="assets/photographers/${photographerData.portrait}">
  <h2>${photographerData.name}</h2>
  <span class="photographer_section_location">${photographerData.country}, ${photographerData.city}</span>
  <span class="photographer_section_tag">${photographerData.tagline}</span>
  <span class="photographer_section_tarification">${photographerData.price}/jour</span>
  </a>
  
  `;

  card.innerHTML = photographeCard;
  return card;
};

// créer une fonction pour la page perso des photographes via un modèle similaire
