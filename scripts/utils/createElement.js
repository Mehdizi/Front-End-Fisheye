// Configuration of the createDomElement function to simplify the creation of tag in other files

// This function take 2 arguments, one tag (the tag that will be created) and one or multiple attributes in accolade
const createDomElement = (tag, attributes = {}) => {
  // creation of the tag with the createElement javascript native function
  const element = document.createElement(tag);
  // creation of attributes, it design attribute and the value {attribute: "value", attribute2: "value"}
  for (const [attribute, value] of Object.entries(attributes)) {
    // if the attribute attribute isn't "events", the setAttribute function is apply for each attribute (key-value pair)
    if (attribute !== "events") {
      element.setAttribute(attribute, value);
    }
  }
  if (attributes.events) {
    // if the attributes is "events", describe and "event" and the callback function
    for (const [event, handler] of Object.entries(attributes.events)) {
      element.addEventListener(event, handler);
    }
  }
  return element;
};
