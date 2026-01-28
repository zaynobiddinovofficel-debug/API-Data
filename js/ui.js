import { elCardTemplate, elTodosContainer, elToast, elToastTemplate, elSuccessTemplate } from './html.js';
import { localTodos } from './add.js';

export function ui(todos) {
  if (!Array.isArray(todos)) return;

  elTodosContainer.innerHTML = '';

  todos.forEach((todo, index) => {
    if (!todo) return;

    const clone = elCardTemplate.content.cloneNode(true);

    clone.querySelector('.js-title').innerText = todo.title || 'No title';
    clone.querySelector('.js-text').innerText = todo.description || todo.text || 'No text';
    clone.querySelector('.js-status').innerText = todo.status || 'unknown';

    // Edit button
    clone.querySelector('.js-edit').addEventListener('click', () => {
      const modal = document.getElementById('my_modal_3');
      modal.querySelector('[name="title"]').value = todo.title;
      modal.querySelector('[name="description"]').value = todo.description || todo.text || '';
      modal.querySelector('[name="status"]').value = todo.status || 'active';
      modal.showModal();

      const editForm = modal.querySelector('#addForm');
      editForm.onsubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(editForm);
        todo.title = formData.get('title').trim();
        todo.description = formData.get('description').trim();
        todo.status = formData.get('status');

        // localStorage saqlash
        localStorage.setItem('localTodos', JSON.stringify(localTodos));

        ui(localTodos);
        modal.close();
        showSuccess('Tahrirlandi!');
      };
    });

    // Delete button
    clone.querySelector('.js-delete').addEventListener('click', () => {
      localTodos.splice(index, 1);

      // localStorage saqlash
      localStorage.setItem('localTodos', JSON.stringify(localTodos));

      ui(localTodos);
      showSuccess('O‘chirildi!');
    });

    elTodosContainer.appendChild(clone);
  });
}

// Toast funksiyasi
function showSuccess(msg) {
  const clone = elSuccessTemplate.content.cloneNode(true);
  clone.querySelector('span').innerText = msg || 'Muvaffaqiyatli!';
  elToast.appendChild(clone);
  setTimeout(() => elToast.firstElementChild?.remove(), 2000);
}
