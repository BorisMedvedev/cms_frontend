import {createRow} from './components/createRow.js';
import {
  getData,
  render,
  totalSumArray,
  updateRowNumbers,
} from './utils.js';

export const init = async () => {
  const app = document.querySelector('.table__body');
  const container = document.getElementById('app');
  const moduleHeader = await import('./components/createHeader.js');
  const header = moduleHeader.createHeader();
  const newArray = await getData();
  const sum = totalSumArray(newArray);
  const addBtn = document.querySelector('.panel__add-goods');

  container.prepend(header);

  document.querySelector('.cms__total-price')
      .textContent = ` ${sum.toLocaleString(
          'fr-FR', {style: 'decimal', minimumFractionDigits: 0})} ₽`;


  addBtn.addEventListener('click', async () => {
    const moduleModal = await import('./components/createModal.js');
    const modal = moduleModal.createModal();
    document.body.append(modal.overlay);
  });
  render(app, newArray, createRow);
  updateRowNumbers();
};

init();

