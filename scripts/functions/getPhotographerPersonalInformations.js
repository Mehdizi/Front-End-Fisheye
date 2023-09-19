const getPhotographerPersonalInformations = async () => {
  const photographers = await getPhotographers();
  const id = getPhotographerId();
  const personalInformationsArr = photographers.filter(
    (photographer) => photographer.id === +id
  );
  const personalInformationsObj = personalInformationsArr[0];
  return personalInformationsObj;
};
