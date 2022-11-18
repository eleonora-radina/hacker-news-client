class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getAllNews() {
    return fetch(`${this._url}/topstories.json`, {
      headers: this._headers
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  getNews(newsId) {
    return fetch(`${this._url}/item/${newsId}.json`, {
      headers: this._headers
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  getComment(commentId) {
    return fetch(`${this._url}/item/${commentId}.json`, {
      headers: this._headers
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

}

const mainApi = new MainApi({
  baseUrl: 'https://hacker-news.firebaseio.com/v0', 
  headers: {
    'Content-Type': 'application/json'
  }
});

export default mainApi;

  /*_getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return res.json().then((err) => {throw err.message;})
  }
  
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: 'include'
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  saveMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailerLink: data.trailerLink,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id
      })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  deleteSavedMovie(data) {
    return fetch(`${this._url}/movies/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  register({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  authorize({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  logout() {
    return fetch(`${this._url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  };

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
    .then((res) => { 
      return this._getResponseData(res)
    });
  }
}

 */