const getPhotographerMedias = async () => {
  const allMedias = await getMedias();
  const photographerId = getPhotographerId();
  const photographerPersonalMedias = allMedias.filter(
    (media) => media.photographerId === +photographerId
  );
  console.log("getphotographerMedias", photographerPersonalMedias);
  return photographerPersonalMedias;
};
