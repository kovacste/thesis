// @ts-ignore
import * as Diff from 'diff/dist/diff.js';
import {DifferentiatedContentBlock} from "@/modules/content/DifferentiatedContentBlock";
import {getContentBlockType} from "@/modules/content/ContentBlockType";
import {Content} from "@/modules/content/Content";
import {ContentWrapper} from "@/modules/content/ContentWrapper";
import {ModificationType} from "@/modules/content/ModificationType";


export class DifferentiatedContent {

  private differentiatedContentBlockArray: DifferentiatedContentBlock[] = [];
  private earlyContent: Content;
  private laterContent: Content;

  constructor(earlyContent: Content, laterContent: Content) {
    this.earlyContent = earlyContent;
    this.laterContent = laterContent;
    this.createDifferentiatedContent();
  }

  public getHtml(): string {
    return this.differentiatedContentBlockArray.map((block: DifferentiatedContentBlock) => {
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

    // végig nézzük a korábbi kontent minden blokkját
    this.earlyContent.getContent().forEach((block) => {

      // ha létezik azonos azonosítójú blokk a későbbi tartalomban
      // akkor összehasonlítjuk a két blokk szövegét
      // ha megegyezik, nem csinálunk vele semmit, ha nem akkor
      // megkeressük a két szöveg között a különbséget és jelöljük
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
        // ha nem létezik azonos azonosítójú blokk a későbbi tartalomban
        // akkor a blokkot eltávolítottnak jelöljük
        text = ContentWrapper.wrapText(block.data.text, ModificationType.REMOVED)
        differenceType = ModificationType.REMOVED;
      }
      this.differentiatedContentBlockArray.push({
        id: block.id,
        type: block.type,
        differenceType,
        data: {
          text,
          level: block.data.level
        }
      });
    });

    // végig nézzük a későbbi tartalom minden blokkját
    // ha azonos azonosítójú blokk nem létezik a korábbi tartalomban
    // akkor a blokkot hozzáadottnak jelöljük, ezzel más dolgunk már nincs
    this.laterContent.getContent().forEach((block) => {
      if (!this.earlyContent.hasBlockWithSameId(block.id)) {
        this.differentiatedContentBlockArray.push({
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
