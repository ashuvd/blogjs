import {Component} from "../core/component";

export class HeaderComponent extends Component {
  constructor(id) {
    super(id);
  }
  init() {
    if (localStorage.getItem('visited')) {
      this.hide();
    }
    this.$btn = this.$el.querySelector('.js-header-start');
    this.buttonHandler = this.buttonHandler.bind(this);
    this.$btn.addEventListener('click', this.buttonHandler)
  }
  buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true));
    this.hide();
  }
}
