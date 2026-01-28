import { elTodosContainer, elCardTemplate } from './html.js';

export function ui(todos) {
  elTodosContainer.innerHTML = '';

  todos.forEach(todo => {
    const clone = elCardTemplate.content.cloneNode(true);

    clone.querySelector('.js-title').innerText = todo.title;
    clone.querySelector('.js-text').innerText = todo.text;
    clone.querySelector('.js-status').innerText = todo.status;

    clone.querySelector('.js-edit').dataset.id = todo.id;
    clone.querySelector('.js-delete').dataset.id = todo.id;

    elTodosContainer.appendChild(clone);
  });
}
