import { getRefs } from './refs';

const { galleryElement } = getRefs();

export function renderMarkup(result) {
  const markup = `<ul class="gallery-list">${result
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
        <li class="gallery-list__item"><div class="photo-card">
          <a href="${largeImageURL}" >
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <ul class="info">
            <li class="info-list">
              <p class="info-text">Likes
              <span class="span">${likes}</span></p>
            </li>
            <li class="info-list">
              <p class="info-text">Views
              <span class="span">${views}</span></p>
            </li>
            <li class="info-list">
              <p class="info-text">Comments
              <span class="span">${comments}</span></p>
            </li>
            <li class="info-list">
              <p class="info-text">Downloads
              <span class="span">${downloads}</span></p>
            </li>
          </ul>
        </div></li>`
    )
    .join('')}</ul>`;

  drowMarkup(markup);
}

function drowMarkup(markup) {
  galleryElement.insertAdjacentHTML('beforeend', markup);
}
