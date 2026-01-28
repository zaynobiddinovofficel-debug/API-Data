import { elTodosContainer, elAddForm } from './html.js';
import { loader } from './loader.js';
import { ui } from './ui.js';

const modal = document.getElementById('my_modal_3');

let state = [];
let editId = null;

/* STATE */
function stateChanger(data) {
  state = data;
  ui(state);
}

/* GET */
loader(true);
fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos')
  .then(res => res.json())
  .then(res => stateChanger(res.data))
  .finally(() => loader(false));

/* ADD + EDIT */
elAddForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(elAddForm);
  const todo = {};

  formData.forEach((v, k) => todo[k] = v);

  if (editId) {
    editTodo({ ...todo, id: editId });
  } else {
    addTodo(todo);
  }

  elAddForm.reset();
});

/* ADD */
function addTodo(todo) {
  loader(true);

  fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then(res => res.json())
    .then(res => {
      stateChanger([res, ...state]);
      modal.close();
    })
    .finally(() => loader(false));
}

/* EDIT */
function editTodo(todo) {
  loader(true);

  fetch(`https://json-api.uz/api/project/muhammaddiyor-afandim/todos/${todo.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })
    .then(res => res.json())
    .then(res => {
      state = state.map(t => t.id === res.id ? res : t);
      stateChanger(state);
      editId = null;
      modal.close();
    })
    .finally(() => loader(false));
}

/* DELETE + EDIT CLICK */
elTodosContainer.addEventListener('click', (e) => {

  /* DELETE */
  if (e.target.closest('.js-delete')) {
    const id = +e.target.closest('.js-delete').dataset.id;

    loader(true);
    fetch(`https://json-api.uz/api/project/muhammaddiyor-afandim/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        stateChanger(state.filter(t => t.id !== id));
      })
      .finally(() => loader(false));
  }

  /* EDIT */
  if (e.target.closest('.js-edit')) {
    const id = +e.target.closest('.js-edit').dataset.id;
    const todo = state.find(t => t.id === id);

    editId = id;
    modal.showModal();

    elAddForm.title.value = todo.title;
    elAddForm.description.value = todo.description;
    elAddForm.status.value = todo.status;
  }
});
