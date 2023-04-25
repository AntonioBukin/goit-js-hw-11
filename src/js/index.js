import { fetchImages } from '../js/fetchImages.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form-input');
const btnSearch = document.querySelector('.search-form-button');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let gallerySimpleLightbox = new SimpleLightbox('.gallery a');

btnLoadMore.style.display = 'none';

let pageNumber = 1;

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundDate => {
      if (foundDate.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImageList(foundDate.hits);
        Notiflix.Notify.success(
          `Congratulation!We found ${foundDate.totalHits} images`
        );
        btnLoadMore.style.display = 'block';
        gallerySimpleLightbox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber++;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundDate => {
    if (foundDate.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      renderImageList(foundDate.hits);
      Notiflix.Notify.success(
        `Congratulation!We found ${foundDate.totalHits} images`
      );
      btnLoadMore.style.display = 'block';
    }
  });
});

function renderImageList(images) {
  console.log(images, 'images');
  const markup = images.map(image => {
    console.log(img, 'img');
    return `<div class="photo-card">
    <a href="${image.largeImageURL}">
  <img class="photo" src="${image.webformatURL}" alt="${image.tags}" title="${image.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
  });
}
