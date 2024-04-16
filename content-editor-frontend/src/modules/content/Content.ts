import {ContentBlock} from "@/modules/content/ContentBlock";

export class Content {

  private readonly content: ContentBlock[] = [];

  constructor(content: ContentBlock[]) {
    this.content = content;
  }

  public getContent(): ContentBlock[] {
      return this.content;
  }

  public hasBlockWithSameId(id: string): boolean {
    return this.content.some((block) => block.id === id);
  }

  public getBlockById(id: string): ContentBlock {
    return this.content.find((block) => block.id === id) ?? {} as ContentBlock;
  }
}
