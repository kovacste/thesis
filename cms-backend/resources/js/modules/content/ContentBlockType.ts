import {DifferentiatedContentBlock} from "./DifferentiatedContentBlock";

export const ContentBlockTypeMap = {
  'paragraph': 'p',
  'header': 'h',
} as const;

export type ContentBlockType = keyof typeof ContentBlockTypeMap;


export function getContentBlockType(block: DifferentiatedContentBlock) {
  const baseType = ContentBlockTypeMap[block.type];
  if (block.data?.level) {
    return `${baseType}${block.data.level}`;
  }
  return baseType;
}
