const createDomElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }
  return element;
};
