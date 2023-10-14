export const createInputFormElement = (
    tagName,
    id,
    spanTextContent,
    addClass,

) => {
  const label = document.createElement('label');
  const span = document.createElement('span');
  const input = document.createElement(tagName);

  label.className = 'modal__label';
  span.className = 'modal__text';
  input.className = 'modal__input';
  input.classList.add(addClass);

  span.textContent = spanTextContent;

  label.for = id;
  input.name = id;
  input.id = id;


  label.prepend(span, input);

  return {
    label,
    input,
  };
};
