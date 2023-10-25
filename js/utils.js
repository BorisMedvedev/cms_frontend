export const render = (app, array, fn) => {
  app.innerHTML = '';
  array.forEach(element => {
    app.append(fn(element));
  });
};

export const generateId = () => {
  let id = '';
  for (let i = 0; i < 14; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return id;
};

export const updateRowNumbers = () => {
  const table = document.querySelector('table');
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const numberCell = row.getElementsByTagName('td')[0];
    numberCell.textContent = i;
  }
};

export const totalSumArray = (array) => array.reduce((acc, product) => {
  const productSum = product.price * product.count;
  return acc + productSum;
}, 0);

export const getData = async () => {
  try {
    const response = await fetch('/goods.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const priceEditor = (price = null) => `${(price).toLocaleString(
    'fr-FR', {style: 'decimal', minimumFractionDigits: 0})} ₽`;
