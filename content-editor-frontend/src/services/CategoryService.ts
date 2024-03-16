import { Service } from "@/services/Service";
import {ContentService} from "@/services/ContentService";

export class CategoryService extends Service {

  protected apiBase: string = 'http://localhost:8000/api/category/';

  private static _instance: CategoryService;
  public static getInstance(): CategoryService {
    if (!this._instance) {
      this._instance = new CategoryService();
    }
    return this._instance;
  }

}
