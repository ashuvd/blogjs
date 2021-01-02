import {Component} from "../core/component";
import {Form} from "../core/form";
import {Validators} from "../core/validators";
import { apiService } from "../services/api.service";

export class CreateComponent extends Component {
  constructor(id) {
    super(id);
  }
  async submitHandler(e) {
    e.preventDefault();
    if (!this.form.isValid()) {
      return;
    }
    const formData = {
      type: this.$el.type.value,
      date: new Date().toLocaleDateString(),
      ...this.form.value()
    }
    await apiService.createPost(formData);
    this.form.clear();
  }
  init() {
    this.submitHandler = this.submitHandler.bind(this);
    this.$el.addEventListener('submit', this.submitHandler);
    this.form = new Form(this.$el, {
      title: [Validators.required],
      fulltext: [Validators.required, Validators.minLength(10)]
    });
  }
}
