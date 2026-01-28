import { elAddForm, elToast, elToastTemplate, elSuccessTemplate } from './html.js';
import { ui } from './ui.js';

// Avval localStorage’dan yuklash
export let localTodos = JSON.parse(localStorage.getItem('localTodos') || '[]');

// Boshlang‘ich UI
ui(localTodos);

elAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(elAddForm);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const status = formData.get('status');

  if (!title) {
    showToast('Title kiriting!');
    return;
  }

  // Todo qo‘shish
  const newTodo = { title, description, status };
  localTodos = [newTodo, ...localTodos];

  // localStorage saqlash
  localStorage.setItem('localTodos', JSON.stringify(localTodos));

  ui(localTodos);

  elAddForm.reset();
  document.getElementById('my_modal_3').close();
  showSuccess('Muvaffaqiyatli qo‘shildi!');
});

// Toast
function showToast(text) {
  const clone = elToastTemplate.content.cloneNode(true);
  clone.querySelector('span').innerText = text;
  elToast.appendChild(clone);
  setTimeout(() => elToast.firstElementChild?.remove(), 1500);
}

// Success
function showSuccess(text) {
  const clone = elSuccessTemplate.content.cloneNode(true);
  clone.querySelector('span').innerText = text;
  elToast.appendChild(clone);
  setTimeout(() => elToast.firstElementChild?.remove(), 2000);
}
