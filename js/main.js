import {createLoader} from './components/createLoader.js';
import {createRow} from './components/createRow.js';
import {goodsApi} from './goodsApi.js';
import {
  render,
  totalSumArray,
  updateRowNumbers,
} from './utils.js';

export const init = async () => {
  const app = document.querySelector('.table__body');
  const container = document.getElementById('app');
  const loader = createLoader();
  const moduleHeader = await import('./components/createHeader.js');
  const header = moduleHeader.createHeader();
  const addBtn = document.querySelector('.panel__add-goods');
  const goods = await goodsApi();
  const sum = totalSumArray(goods.goods);
  container.prepend(header);

  document.querySelector('.cms__total-price')
      .textContent = ` ${sum.toLocaleString(
          'fr-FR', {style: 'decimal', minimumFractionDigits: 0})} ₽`;


  addBtn.addEventListener('click', async () => {
    const moduleModal = await import('./components/createModal.js');
    const modal = moduleModal.createModal();
    document.body.append(modal.overlay);
  });

  app.append(loader);
  app.style.height = `300px`;

  setTimeout(() => {
    loader.remove();
    render(app, goods.goods, createRow);
    app.style.height = '';
    updateRowNumbers();
  }, 2000);
};

init();

