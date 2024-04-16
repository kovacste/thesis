import {Service} from "./Service";

export class CategoryService extends Service {

  protected apiBase: string = 'http://localhost:8000/api/category/';

  async saveCategory(category: any) {
      return await this.post('', category);
  }

  async getAllCategories() {
      return await this.get('categories');
  }
}
