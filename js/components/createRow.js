import {generateId, priceEditor} from '../utils.js';

export const createRow = (obj) => {
  const trRow = document.createElement('tr');
  const num = document.createElement('td');
  const nameId = document.createElement('td');
  const titleId = document.createElement('span');
  const title = document.createElement('span');
  const category = document.createElement('td');
  const units = document.createElement('td');
  const quantity = document.createElement('td');
  const price = document.createElement('td');
  const result = document.createElement('td');
  const btnBlock = document.createElement('td');
  const btnPic = document.createElement('button');
  const btnEdit = document.createElement('button');
  const btnDel = document.createElement('button');
  const img = document.createElement('img');
  const genId = generateId();

  num.classList.add('table__cell');
  nameId.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  category.classList.add('table__cell');
  units.classList.add('table__cell');
  quantity.classList.add('table__cell');
  price.classList.add('table__cell');
  result.classList.add('table__cell');
  btnBlock.classList.add('table__cell', 'table__cell_btn-wrapper');
  btnPic.classList.add('table__btn', 'table__btn_pic');
  btnEdit.classList.add('table__btn', 'table__btn_edit');
  btnDel.classList.add('table__btn', 'table__btn_del');
  titleId.classList.add('table__cell-id');

  nameId.dataset.id = genId;

  titleId.textContent = `ID: ${genId}`;
  title.textContent = obj.title;
  category.textContent = obj.category;
  units.textContent = obj.units;

  img.src = obj.images.big;
  if (obj.count > 0) {
    quantity.textContent = obj.count;
    price.textContent = priceEditor(parseFloat(`${obj.price}`));
    result.textContent = priceEditor(parseFloat(`${(obj.price * obj.count)}`));
  } else {
    quantity.textContent = 'Нет в наличии';
    price.textContent = '-';
    result.textContent = '-';
  }

  nameId.append(titleId, title);
  btnBlock.append(btnPic, btnEdit, btnDel);
  trRow.append(num, nameId, category, units, quantity, price, result, btnBlock);

  btnPic.setAttribute('data-pic', img.src);

  const openImageWindow = (event) => {
    const url = event.target.getAttribute('data-pic');
    const width = 800;
    const height = 600;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    window.open(url, '', 'width=' + width + ', height=' +
    height + ', top=' + top + ', left=' + left);

    console.log(url, '', 'width=' + width + ', height=' +
    height + ', top=' + top + ', left=' + left);
  };

  btnPic.addEventListener('click', openImageWindow);

  return trRow;
};

