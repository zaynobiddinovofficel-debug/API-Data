import { elAddForm, elToast, elToastTemplate, elSuccessTemplate } from './html.js';
import { loader } from './loader.js';
import { ui } from './ui.js';

let state = null;

function stateChanger(value) {
  state = value;
  ui(state);
}

loader(true);
fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos')
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    stateChanger(res.data);
  })
  .catch((err) => {
    console.log('Xatolik bor ' + err);
  })
  .finally(() => {
    loader(false);
  });
