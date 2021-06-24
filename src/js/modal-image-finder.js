import refs from './refs-image-finder';
import * as basicLightbox from 'basiclightbox';

refs.imagesContainer.addEventListener('click', openLargeImage);

function openLargeImage(e){
    if(e.target.nodeName === "IMG"){
        const largeImage = e.target.dataset.source;
        return basicLightbox.create(`<img src="${largeImage}" width="1600" height="900">`).show();
    }
}