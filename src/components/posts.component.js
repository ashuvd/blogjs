import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
  constructor(id, {loader}) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
  }
  clickHandler(e) {
    const $el = e.target;
    const id = $el.dataset.id;
    const name = $el.dataset.name;
    if (id) {
     const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
     const postIndex = favorites.findIndex(f => f.id === id);
     if (postIndex >= 0) {
       favorites.splice(postIndex, 1);
       $el.textContent = 'Сохранить';
       $el.classList.add('button-primary');
       $el.classList.remove('button-danger');
     } else {
       console.log(id, name)
       favorites.push({id, name});
       $el.textContent = 'Удалить';
       $el.classList.remove('button-primary');
       $el.classList.add('button-danger');
     }
     localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
  async onShow() {
    this.loader.show();
    const fbData = await apiService.fetchPosts();
    const posts = TransformService.fbObjectToArray(fbData);
    const html = posts.map(post => renderPost(post, {withButton: true})).join('');
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}
