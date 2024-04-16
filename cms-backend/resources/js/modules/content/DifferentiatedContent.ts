import * as Diff from 'diff/dist/diff.js';
import {Content} from "./Content";
import {DifferentiatedContentBlock} from "./DifferentiatedContentBlock";
import {getContentBlockType} from "./ContentBlockType";
import {ContentWrapper} from "./ContentWrapper";
import {ModificationType} from "./ModificationType";



export class DifferentiatedContent {

  private differentiatedContentArray: DifferentiatedContentBlock[] = [];
  private earlyContent: Content;
  private laterContent: Content;

  constructor(earlyContent: Content, laterContent: Content) {
    this.earlyContent = earlyContent;
    this.laterContent = laterContent;
    this.createDifferentiatedContent();
  }

  public getHtml(): string {
    return this.differentiatedContentArray.map((block: DifferentiatedContentBlock) => {
      return `<${getContentBlockType(block)}>
                ${block.data.text}
            </${getContentBlockType(block)}>`
    }).join('');
  }

  public getDifferenceText(text1: string, text2: string): string {
    const differences = Diff.diffWords(text1, text2);
    let text = '';
    differences.forEach((difference: any) => {
      if (difference.added) {
        text += ContentWrapper.wrapText(difference.value, ModificationType.ADDED);
      } else if (difference.removed) {
        text += ContentWrapper.wrapText(difference.value, ModificationType.REMOVED);
      } else {
        text += difference.value;
      }
    });
    return text;
  }

  private createDifferentiatedContent() {

    let text: string;
    let differenceType: ModificationType;

    this.earlyContent.getContent().forEach((block) => {

      if (this.laterContent.hasBlockWithSameId(block.id)) {

        const blockWithSameId = this.laterContent.getBlockById(block.id);

        if (block.data.text !== blockWithSameId.data.text) {

          text = this.getDifferenceText(block.data.text, blockWithSameId.data.text);
          differenceType = ModificationType.MODIFIED;

        } else {

          text = blockWithSameId.data.text;
          differenceType = ModificationType.SAME;

        }
      } else {

        text = ContentWrapper.wrapText(block.data.text, ModificationType.REMOVED)
        differenceType = ModificationType.REMOVED;

      }

      this.differentiatedContentArray.push({
        id: block.id,
        type: block.type,
        differenceType,
        data: {
          text,
          level: block.data.level
        }
      });
    });

    this.laterContent.getContent().forEach((block) => {
      if (!this.earlyContent.hasBlockWithSameId(block.id)) {
        this.differentiatedContentArray.push({
          id: block.id,
          type: block.type,
          differenceType: ModificationType.ADDED,
          data: {
            text: ContentWrapper.wrapText(block.data.text, ModificationType.ADDED),
            level: block.data.level
          }
        })
      }
    });
  }
}
