import {ModificationType} from "@/modules/content/ModificationType";

export class ContentWrapper {
  public static wrapText(text: string, differenceType: ModificationType): string {
    switch (differenceType) {
      case ModificationType.ADDED:
        // amennyiben a változtatás típusa, az ADDED,
        // akkor a szöveg zöld színnel kerül megjelenítésre
        return `<span style="background-color: green">${text}</span>`;
      case ModificationType.REMOVED:
        // amennyiben a változtatás típusa, a REMOVED,
        // akkor a szöveg piros színnel kerül megjelenítésre
        return `<span style="background-color: red">${text}</span>`;
      default:
        // alapértelmezetten a szöveggel nem csinálunk semmit
        return text;
    }
  }
}
