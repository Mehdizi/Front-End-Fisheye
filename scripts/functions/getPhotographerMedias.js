/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const getPhotographerMedias = async () => {
  const allMedias = await getMedias();
  const photographerId = getPhotographerId();
  const photographerPersonalMedias = allMedias.filter(
    (media) => media.photographerId === +photographerId
  );
  return photographerPersonalMedias;
};
