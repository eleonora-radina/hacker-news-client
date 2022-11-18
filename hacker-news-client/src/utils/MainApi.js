class MainApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  
  getAllNews() {
    return fetch(`${this._url}/newstories.json`, {
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