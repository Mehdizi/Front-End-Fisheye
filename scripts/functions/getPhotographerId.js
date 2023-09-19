const getPhotographerId = () => {
  const searchParams = window.location.search;
  const urlParams = new URLSearchParams(searchParams);
  const id = urlParams.get("id");
  return id;
};
