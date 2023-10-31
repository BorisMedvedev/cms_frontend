import {createClient} from '../goodsApi.js';
import {generateId, priceEditor, updateRowNumbers} from '../utils.js';
import {createInputFormElement} from './createInputFormElement.js';
import {createRow} from './createRow.js';

export const createModal = () => {
  const overlay = document.createElement('div');
  const overlayModal = document.createElement('div');
  const modalClose = document.createElement('button');
  const modalTop = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalVendorCode = document.createElement('div');
  const vendorCodeWrapper = document.createElement('p');
  const vendorCodeId = document.createElement('span');
  const form = document.createElement('form');
  const fieldset = document.createElement('fieldset');
  const modalFooter = document.createElement('div');
  const modalTotal = document.createElement('label');
  const modalTotalPrice = document.createElement('output');
  const modalSubmit = document.createElement('button');
  const modalLabelDiscount = document.createElement('div');
  const modalCheckboxWrapper = document.createElement('div');
  const labelDiscount = document.createElement('label');
  const modalCheckbox = document.createElement('input');
  const modalInputDiscount = document.createElement('input');
  const labelImage = document.createElement('label');
  const inputImage = document.createElement('input');
  const inputName = createInputFormElement(
      'input',
      'name',
      'Наименование',
  );
  const inputCategory = createInputFormElement(
      'input',
      'category',
      'Категория',
  );
  const inputDescription = createInputFormElement(
      'textarea',
      'description',
      'Описание',
      'modal__input_textarea',
  );
  const inputUnits = createInputFormElement(
      'input',
      'units',
      'Единицы измерения',
      'modal__label_units',
  );
  const inputCount = createInputFormElement(
      'input',
      'count',
      'Количество',
  );
  const inputPrice = createInputFormElement(
      'input',
      'price',
      'Цена',
      'modal__label_price',
  );
  const photoPreview = document.createElement('div');
  const photoPreviewImg = document.createElement('img');

  photoPreview.classList.add('photo-preview');
  labelImage.classList.add('modal__label', 'modal__label_file');
  inputImage.classList.add('modal__file', 'visually-hidden');
  modalSubmit.classList.add('modal__submit');
  fieldset.classList.add('modal__fieldset');
  overlay.classList.add('overlay');
  overlayModal.classList.add('overlay__modal', 'modal');
  modalClose.classList.add('modal__close');
  overlay.classList.add('overlay');
  modalTop.classList.add('modal_top');
  modalTitle.classList.add('modal__title');
  modalVendorCode.classList.add('modal__vendor-code', 'vendor-code');
  vendorCodeWrapper.classList.add('vendor-code__wrapper');
  vendorCodeId.classList.add('vendor-code__id');
  form.classList.add('modal__form');
  inputName.label.classList.add('modal__label_name');
  inputCategory.label.classList.add('modal__label_category');
  inputDescription.label.classList.add('modal__label_description');
  inputCount.label.classList.add('modal__label_count');
  inputPrice.label.classList.add('modal__label_price');
  modalFooter.classList.add('modal__footer');
  modalTotal.classList.add('modal__total');
  modalTotalPrice.classList.add('modal__total-price');

  modalLabelDiscount.classList.add('modal__label', 'modal__label_discount');
  labelDiscount.classList.add('modal__text');
  modalCheckboxWrapper.classList.add('modal__checkbox-wrapper');
  modalCheckbox.classList.add('modal__checkbox');
  modalInputDiscount.classList.add('modal__input', 'modal__input_discount');

  labelDiscount.textContent = 'Дисконт';
  modalTitle.textContent = 'Добавить товар';
  vendorCodeId.textContent = `id: ${generateId()}`;
  form.method = 'POST';
  // form.action = '#';
  // form.action = 'https://jsonplaceholder.typicode.com/posts';

  inputCount.input.type = 'number';
  inputPrice.input.type = 'number';
  modalTotal.textContent = 'Итоговая стоимость: ';
  labelImage.for = 'image';
  labelImage.type = 'file';
  inputImage.name = 'image';
  inputImage.id = 'image';
  inputImage.tabindex = '-1';
  labelImage.textContent = 'Добавить изображение';
  modalCheckbox.type = 'checkbox';
  modalInputDiscount.disabled = true;
  labelDiscount.for = 'discount';
  modalCheckbox.name = 'discount';
  modalInputDiscount.type = 'text';
  modalInputDiscount.name = 'discount_count';
  modalSubmit.textContent = 'Добавить товар';
  // photoPreview.textContent = 'Изображение не должно превышать размер 1мб';

  // photoPreview.append(photoPreviewImg);
  modalCheckboxWrapper.append(modalCheckbox, modalInputDiscount);
  modalLabelDiscount.append(labelDiscount, modalCheckboxWrapper);
  modalTotal.append(modalTotalPrice);
  modalFooter.append(modalTotal, modalSubmit);
  fieldset.prepend(
      inputName.label,
      inputCategory.label,
      inputDescription.label,
      inputUnits.label,
      inputCount.label,
      modalLabelDiscount,
      inputPrice.label,
      labelImage,
      // photoPreview,
  );
  form.append(fieldset, modalFooter);
  vendorCodeWrapper.append(vendorCodeId);
  modalVendorCode.append(vendorCodeWrapper);
  modalTop.append(modalTitle, modalVendorCode);
  overlayModal.append(modalClose, modalTop, form);
  overlay.append(overlayModal);

  document.addEventListener('click', (e) => {
    if (e.target === modalClose || e.target === overlay) {
      overlay.remove();
    }
  });

  inputCount.input.addEventListener('change', () => {
    const value = parseFloat(inputCount.input.value * inputPrice.input.value);
    const res = priceEditor(value);

    if (!inputPrice.input.value) {
      modalTotalPrice.textContent = '';
    } else {
      modalTotalPrice.textContent = res;
    }
  });
  inputPrice.input.addEventListener('change', () => {
    const value = parseFloat(inputCount.input.value * inputPrice.input.value);
    const res = priceEditor(value);

    if (!inputPrice.input.value) {
      modalTotalPrice.textContent = '';
    } else {
      modalTotalPrice.textContent = res;
    }
  });

  modalCheckbox.addEventListener('input', () => {
    if (modalCheckbox.checked) {
      modalInputDiscount.disabled = false;
      modalInputDiscount.addEventListener('change', () => {
        const value = parseFloat((inputCount.input.value * inputPrice.input.value * modalInputDiscount.value) / 100);
        const res = priceEditor(value);

        if (!modalInputDiscount.value) {
          modalTotalPrice.textContent = '';
        } else {
          modalTotalPrice.textContent = res;
          console.log(res);
        }
      });
    } else {
      modalInputDiscount.disabled = true;
      modalInputDiscount.value = '';
    }
  });

  inputName.input.required = true;
  inputCategory.input.required = true;
  inputCount.input.required = true;
  inputUnits.input.required = true;
  inputPrice.input.required = true;
  modalInputDiscount.required = true;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newTrRow = {};
    newTrRow.title = inputName.input.value.trim();
    newTrRow.category = inputCategory.input.value.trim();
    newTrRow.description = inputDescription.input.value.trim();
    newTrRow.count = inputCount.input.value.trim();
    newTrRow.units = inputUnits.input.value.trim();
    newTrRow.price = inputPrice.input.value.trim();
    newTrRow.discont = modalInputDiscount.value.trim();
    await createClient(newTrRow, 'POST', newTrRow.id);
    document.querySelector('tbody').append(createRow(newTrRow));
    overlay.remove();
    updateRowNumbers();
  });
  return {
    overlay,
    overlayModal,
    vendorCodeId,
  };
};


