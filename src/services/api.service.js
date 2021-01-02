class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }
  async createPost(post) {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'POST',
        body: JSON.stringify(post)
      })
      return this.useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }
  async fetchPosts() {
    try {
      const request = new Request(`${this.url}/posts.json`, {
        method: 'GET'
      })
      return this.useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }
  async useRequest(request) {
    const response = await fetch(request);
    return await response.json();
  }
  async fetchPostById(id) {
    try {
      const request = new Request(`${this.url}/posts/${id}.json`, {
        method: 'GET'
      })
      return this.useRequest(request);
    } catch (e) {
      console.error(e);
    }
  }
}

export const apiService = new ApiService('https://blogjs-b394e-default-rtdb.firebaseio.com');
