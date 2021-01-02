import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template";

export class FavoriteComponent extends Component {
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }
  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = this.renderList(favorites);
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onHide() {
    this.$el.innerHTML = '';
  }

  renderList(list = []) {
    console.log(list)
    if (list && list.length) {
      return `
        <ul>
          ${list.map(item => `<li><a href="#" data-id="${item.id}" class="js-link">${item.name}</a></li>`).join('')}
        </ul>
      `
    }
    return '<p class="center">Вы пока ничего не добавили</p>'
  }
  async clickHandler(e) {
    e.preventDefault();
    if (e.target.classList.contains('js-link')) {
      const postId = e.target.dataset.id;
      this.$el.innerHTML = '';
      this.loader.show();
      const post = await apiService.fetchPostById(postId);
      this.loader.hide();
      this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}));
    }
  }
}
