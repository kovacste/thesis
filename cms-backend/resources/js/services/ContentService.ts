import {Service} from "./Service";
import {Content} from "../models/Content";

export class ContentService extends Service {

  protected apiBase: string = 'http://localhost:8000/api/content/';

  async getContent(id: number): Promise<Content>{
    return await this.get(`${id}`);
  }
  async saveContent(id: number, content: Content) {
      if (id == null)
      {
        return await this.post('', content);
      }
      return await this.post(`${id}`, content);
  }
  async getContentHistory(id: number) {
    return await this.get(`history/${id}`);
  }
  async getContents() {
    return await this.get('contents');
  }

  async delete(id: number) {
    return await this.get('content/delete/' + id);
  }
  async getFilteredContents(filter) {
        return await this.get(`content/${filter.category_id}/${filter.author_id}/${filter.search_term}`);
  }

  async rollbackContent(oldId: number, newId: number) {
    return await this.get(`rollback/${oldId}/${newId}`, {});
  }
}
