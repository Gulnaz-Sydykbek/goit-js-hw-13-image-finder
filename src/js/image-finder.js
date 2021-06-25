import ImagesApiService from './image-finder-service';
import refs from './refs-image-finder';
import imagesTpl from '../templates/image-finder.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import { success } from '@pnotify/core';
import { error } from '@pnotify/core';

const imagesApiService = new ImagesApiService();
//refs.loadMoreBtn.classList.add('is-hidden');

refs.searchForm.addEventListener('submit', onSearch);
//refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesApiService.query = form.elements.query.value;

  form.reset();
  clearImagesContainer();
  imagesApiService.resetPage();
  observer.observe(refs.sentinel);
  //refs.loadMoreBtn.classList.remove('is-hidden');
}

//function onLoadMore() {
//  newsApiService.fetchImages().then(appendImagesMarkup);
//}

function appendImagesMarkup(images) {
  if (images.length > 1) {
    success({
      text: 'Successful loading of images!',
      addClass: 'success',
      delay: 500,
    });
  }

  if (images.length === 0) {
    error({
      text: 'Not found!',
      addClass: 'success',
      delay: 500,
    });
  }
  const markup = imagesTpl(images);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}


const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && imagesApiService.query !== '') {
      imagesApiService.fetchImages().then(appendImagesMarkup);
    }
  });
};

const options = {
  rootMargin: '150px',
};

const observer = new IntersectionObserver(callback, options);