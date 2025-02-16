/* eslint-disable no-unused-vars */
async function getMedias() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    const medias = data.media;
    return medias;
  } else {
    throw new Error(
      "Impossible de contacter le serveur pour récupérer les médias"
    );
  }
}
