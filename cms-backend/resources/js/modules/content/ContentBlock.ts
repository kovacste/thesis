import {ContentBlockType} from "./ContentBlockType";

export interface ContentBlock {
  id: string;
  category_id?: number;
  type: ContentBlockType;
  data: {text: string, level: number};
}
