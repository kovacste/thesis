import {Service} from "./Service";
import {Content} from "../models/Content";

export class ContentService extends Service {

  protected apiBase: string = 'http://localhost:8000/api/content/';

  async getContent(id: number): Promise<Content>{
    return await this.get(`${id}`);
  }
  async saveContent(id: number, content: Content) {
      return await this.post(`${id}`, content);
  }
  async getContentHistory(id: number) {
    return await this.get(`history/${id}`);
  }
  async getContents() {
    return await this.get('contents');
  }
}
