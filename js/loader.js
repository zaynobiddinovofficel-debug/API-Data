import { elLoader } from './html.js';

export function loader(bool) {
  elLoader.classList.toggle('hidden', !bool);
}
