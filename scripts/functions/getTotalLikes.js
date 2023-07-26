const getTotalLikes = async () => {
  const photographerMedias = await getPhotographerMedias();
  let totalLikes = 0;
  for (let i = 0; i < photographerMedias.length; i++) {
    totalLikes += photographerMedias[i].likes;
  }
  return totalLikes;
};
