async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    const photographers = data.photographers;
    return photographers;
  } else {
    throw new Error(
      "Impossible de contacter le serveur pour récupérer les photographes"
    );
  }
}
