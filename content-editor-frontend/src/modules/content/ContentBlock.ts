import { ContentBlockType } from "@/modules/content/ContentBlockType";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  data: {text: string, level: number};
}
