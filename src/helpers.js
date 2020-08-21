const createContent = (tag, className, text) => {
  const element = document.createElement(tag);

  if (text) { element.innerHTML = text; }
  if (className) { element.className = className; }

  return element;
};

const createContainer = (tag, className, idName) => {
  const element = document.createElement(tag);

  if (className) { element.className = className; }
  if (idName) { element.id = idName; }

  return element;
};

const createInput = (type, idName, required = true, placeholder, value) => {
  const element = document.createElement('input');

  element.setAttribute('type', type);
  if (placeholder) { element.setAttribute('placeholder', placeholder); }
  if (idName) { element.id = idName; }
  if (required) { element.setAttribute('required', ''); }
  if (value) { element.value = value; }

  return element;
};

export { createContent, createContainer, createInput };
