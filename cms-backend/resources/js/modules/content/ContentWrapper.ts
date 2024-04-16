import {ModificationType} from "./ModificationType";

export class ContentWrapper {
  public static wrapText(text: string, differenceType: ModificationType): string {
    switch (differenceType) {
      case ModificationType.ADDED:
        return `<span style="background-color: green">${text}</span>`;
      case ModificationType.REMOVED:
        return `<span style="background-color: red">${text}</span>`;
      default:
        return text;
    }
  }
}
