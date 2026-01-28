import {
  elAddForm,
  elToast,
  elToastTemplate,
  elSuccessTemplate
} from './html.js';
import { ui } from './ui.js';

// localStorage dan olish
export let localTodos = JSON.parse(localStorage.getItem('localTodos') || '[]');

// Boshlang‘ich UI
ui(localTodos);

/* ADD */
elAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(elAddForm);
  const title = formData.get('title')?.trim();
  const description = formData.get('description')?.trim();
  const status = formData.get('status');

  if (!title) {
    showError('Title kiriting!');
    return;
  }

  const newTodo = {
    id: Date.now(),
    title,
    description,
    status,
  };

  localTodos = [newTodo, ...localTodos];
  localStorage.setItem('localTodos', JSON.stringify(localTodos));

  ui(localTodos);

  elAddForm.reset();
  document.getElementById('my_modal_3').close();
  showSuccess('Todo qo‘shildi!');
});

/* TOAST ERROR */
function showError(text) {
  const clone = elToastTemplate.content.cloneNode(true);
  clone.querySelector('span').innerText = text;
  elToast.appendChild(clone);

  setTimeout(() => {
    elToast.firstElementChild?.remove();
  }, 1500);
}

/* TOAST SUCCESS */
function showSuccess(text) {
  const clone = elSuccessTemplate.content.cloneNode(true);
  clone.querySelector('span').innerText = text;
  elToast.appendChild(clone);

  setTimeout(() => {
    elToast.firstElementChild?.remove();
  }, 2000);
}
