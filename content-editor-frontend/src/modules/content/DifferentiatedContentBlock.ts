import {ModificationType} from "@/modules/content/ModificationType";
import {ContentBlockType} from "@/modules/content/ContentBlockType";

export interface DifferentiatedContentBlock {
  id: string;
  type: ContentBlockType;
  differenceType: ModificationType;
  data: {
    text: string;
    level: number;
  }
}
