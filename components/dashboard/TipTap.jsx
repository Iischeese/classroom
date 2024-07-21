"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useDebounce } from "use-debounce";
import Button from "../Button";
import {
  BinaryIcon,
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  SeparatorHorizontalIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { useEffect } from "react";

function TipTap({ setItem, defaultValue, readOnly }) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: !readOnly,
    content: "<p>Loading...</p>",
    extensions: [StarterKit.configure(), Underline],
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none rounded-md rounded-t-none border border-text/40  focus:outline-none focus:border-accent p-5",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(defaultValue);
    }
  }, [defaultValue]);

  if (!readOnly) {
    const [debouncedEditor] = useDebounce(
      editor?.state.doc.content.toJSON(),
      500
    );

    useEffect(() => {
      if (debouncedEditor) {
        setItem(debouncedEditor);
      }
    }, [debouncedEditor]);
  }

  if (editor)
    return (
      <>
        <div>
          {readOnly? <></> : <Buttons editor={editor} />}
          <EditorContent editor={editor} />
        </div>
      </>
    );
}

function Buttons({ editor }) {
  if (editor) {
    return (
      <>
        <div className="flex w-full *:p-0 *:py-1 *:rounded-none *:border-transparent *:border-r-text/40 *:last:border-r-transparent *:bg-none ">
          <Button
            style={
              editor.isActive("bold")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleBold().run();
            }}
          >
            <BoldIcon />
          </Button>
          <Button
            style={
              editor.isActive("italic")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <ItalicIcon />
          </Button>
          <Button
            style={
              editor.isActive("bulletList")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleBulletList().run();
            }}
          >
            <ListIcon />
          </Button>
          <Button
            style={
              editor.isActive("orderedList")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleOrderedList().run();
            }}
          >
            <ListOrderedIcon />
          </Button>
          <Button
            style={
              editor.isActive("underline")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleUnderline().run();
            }}
          >
            <UnderlineIcon />
          </Button>
          <Button
            style={"bg-background text-text  border-accent border-2"}
            noForm={() => {
              editor.chain().focus().setHorizontalRule().run();
            }}
          >
            <SeparatorHorizontalIcon />
          </Button>
          <Button
            style={
              editor.isActive("blockquote")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleBlockquote().run();
            }}
          >
            <QuoteIcon />
          </Button>
          <Button
            style={
              editor.isActive("codeBlock")
                ? "bg-text text-background  border-accent border-2"
                : "bg-background text-text  border-accent border-2"
            }
            noForm={() => {
              editor.chain().focus().toggleCodeBlock().run();
            }}
          >
            <BinaryIcon />
          </Button>
          <Button
            style={"bg-background text-text  border-accent border-2"}
            noForm={() => {
              editor.chain().focus().undo().run();
            }}
            disabled={!editor.can().undo()}
          >
            <Undo2Icon />
          </Button>
          <Button
            style={"bg-background text-text  border-accent border-2"}
            noForm={() => {
              editor.chain().focus().redo().run();
            }}
            disabled={!editor.can().redo()}
          >
            <Redo2Icon />
          </Button>
        </div>
      </>
    );
  }
}

export default TipTap;
