// Configuration of the createDomElement function to simplify the creation of tag in other files
const createDomElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  for (const [attribute, value] of Object.entries(attributes)) {
    if (attribute !== "events") {
      element.setAttribute(attribute, value);
    }
  }

  if (attributes.events) {
    for (const [event, handler] of Object.entries(attributes.events)) {
      element.addEventListener(event, handler);
    }
  }
  return element;
};
