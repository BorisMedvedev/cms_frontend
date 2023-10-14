export const createHeader = () => {
  const header = document.createElement('header');
  const headerTitle = document.createElement('h1');
  const cmsTotal = document.createElement('p');
  const cmsTotalPrice = document.createElement('span');
  header.className = 'cms__header';
  headerTitle.className = 'cms__title';
  cmsTotal.className = 'cms__total';
  cmsTotalPrice.className = 'cms__total-price';

  headerTitle.textContent = 'CMS - ShopOnline';
  cmsTotal.textContent = 'Итоговая стоимость:  ';

  document.title = headerTitle.textContent;

  cmsTotal.append(cmsTotalPrice);
  header.append(headerTitle, cmsTotal);

  return header;
};

