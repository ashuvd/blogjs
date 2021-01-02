import {Component} from "../core/component";

export class NavigationComponent extends Component {
  constructor(id) {
    super(id);
    this.tabs = [];
  }
  init() {
    this.tabClickHandler = this.tabClickHandler.bind(this);
    this.$el.addEventListener('click', this.tabClickHandler)
  }
  tabClickHandler(e) {
    e.preventDefault();
    if (e.target.classList.contains('tab')) {
      const tabs = Array.from(this.$el.querySelectorAll('.tab'));
      tabs.forEach(tab => tab.classList.remove('active'));
      e.target.classList.add('active');
      const activeTab = this.tabs.find(t => t.name === e.target.dataset.name);
      this.tabs.forEach(t => t.component.hide());
      activeTab.component.show();
    }
  }
  registerTabs(tabs) {
    this.tabs = tabs;
  }
}
