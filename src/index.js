import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getRefs } from './js/refs';
import { renderMarkup } from './js/renderMarkup';
import { fetchImages } from './js/fetchImages';
import { noMorePages } from './js/service';

const { formElement, galleryElement, btnElement, textElement } = getRefs();

let page = null;
let nameImg = '';
const perPage = 40;

const Lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  animationSpeed: 250,
  preloading: false,
  docClose: false,
  widthRatio: 1,
  doubleTapZoom: 1.5,
});

btnElement.classList.add('hidden');

formElement.addEventListener('submit', getUserValue);
btnElement.addEventListener('click', onClickMoreImg);

async function getUserValue(event) {
  event.preventDefault();
  galleryElement.innerHTML = '';
  if (!nameImg) return;
  page = 1;

  try {
    const userValue = await fetchImages(nameImg);
    const userData = userValue.data;
    if (!userData.total) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    textElement.innerHTML = '';

    Notify.success(`Hooray! We found ${userData.totalHits} images.`);
    renderMarkup(userData.hits);

    btnElement.classList.remove('hidden');
    noMorePages(userData);

    Lightbox.refresh();
  } catch (error) {
    console.log(error.message);
  }
}

async function onClickMoreImg() {
  try {
    if (page !== null) {
      page += 1;
      const userValue = await fetchImages(nameImg);
      const userData = userValue.data;
      renderMarkup(userData.hits);
      noMorePages(userData);
      Lightbox.refresh();
    }
  } catch (error) {
    console.log(error.message);
  }
}

export { perPage, page, nameImg };
