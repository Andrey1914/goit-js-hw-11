import { getRefs } from './refs';
import { perPage, page } from '../index';

const { btnElement, textElement } = getRefs();

export function noMorePages(response) {
  const currentPage = page;
  const totalPage = Math.ceil(response.totalHits / perPage);
  if (currentPage === totalPage) {
    btnElement.classList.add('hidden');
    textInAnEnd();
  }
}

function textInAnEnd() {
  const markup = `
  <div class="text-element">
    <p  class="title">We're sorry, but you've reached the end of search results.</p>
</div>
`;
  return (textElement.innerHTML = markup);
}
