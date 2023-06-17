import { Service } from "@/services/Service";
import { Content } from "@/models/Content";

export class ContentService extends Service {

  protected apiBase: string = 'http://localhost:8000/api/content/';

  private static _instance: ContentService;
  public static getInstance(): ContentService {
    if (!this._instance) {
      this._instance = new ContentService();
    }
    return this._instance;
  }
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
