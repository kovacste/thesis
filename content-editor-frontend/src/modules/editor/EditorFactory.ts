import EditorJS from "@editorjs/editorjs";

import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import CheckList from '@editorjs/checklist';


import {InternalToolSettings} from "@editorjs/editorjs/types/tools";

export class EditorFactory
{
  public static createEditor(content?: string): EditorJS {

    let parsedContent = null;
    if (content) {
      parsedContent = JSON.parse(content);
    }

    return new EditorJS({
      holder: 'editorjs',
      data: {
        "version": "2.8.1",
        blocks: parsedContent
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          levels: [1, 2, 3, 4, 5],
          defaultLevel: 2
        } as InternalToolSettings,
        list: {
          class: List,
          inlineToolbar: true,
        },
        link: {
          class: LinkTool,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        checklist: {
          class: CheckList,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'http://localhost:8000/api/image',
              byUrl: 'http://localhost:3000/fetchUrl',
            },
          }
        }
      },
    })
  }
}
