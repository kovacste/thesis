import {Service} from "./Service";

export class TagService extends Service {

    protected apiBase: string = 'http://localhost:8000/api/tag/';

    async saveTag(tag: any) {
        return await this.post('', tag);
    }

    async getAllTags() {
        return await this.get('tags');
    }
}
