const KEY = '22204382-c38be1b1e7fd4cceb3bc7515f';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  
  fetchImages() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    
    return fetch(url)
        .then(response => response.json())
        .then(data => {
          this.page += 1;

          return data.hits;
        });
  }

  resetPage() {
    this.page = 1;
  }
  
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};


