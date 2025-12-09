import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { cn } from '@/lib/utils';
import {
    Bold,
    Code,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Minus,
    Quote,
    Redo,
    Strikethrough,
    Undo,
} from 'lucide-react';
interface RichTextEditorProps {
    content?: string;
    onChange?: (content: string) => void;
    placeholder?: string;
    editable?: boolean;
    className?: string;
}
function RichTextEditor({
    content = '',
    onChange,
    placeholder = 'Start typing...',
    editable = true,
    className,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                    HTMLAttributes: {
                        class: 'list-disc ml-2',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-2',
                    },
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content,
        editable,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
                    'min-h-[200px] border-0 p-4',
                ),
            },
        },
    });

    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => {
            if (!editor) return null;

            return {
                isBold: editor.isActive('bold'),
                canBold: editor.can().chain().focus().toggleBold().run(),
                isItalic: editor.isActive('italic'),
                canItalic: editor.can().chain().focus().toggleItalic().run(),
                isStrike: editor.isActive('strike'),
                canStrike: editor.can().chain().focus().toggleStrike().run(),
                isCode: editor.isActive('code'),
                canCode: editor.can().chain().focus().toggleCode().run(),
                canClearMarks: editor
                    .can()
                    .chain()
                    .focus()
                    .unsetAllMarks()
                    .run(),
                isParagraph: editor.isActive('paragraph'),
                isHeading1: editor.isActive('heading', { level: 1 }),
                isHeading2: editor.isActive('heading', { level: 2 }),
                isHeading3: editor.isActive('heading', { level: 3 }),
                isHeading4: editor.isActive('heading', { level: 4 }),
                isHeading5: editor.isActive('heading', { level: 5 }),
                isHeading6: editor.isActive('heading', { level: 6 }),
                isBulletList: editor.isActive('bulletList'),
                isOrderedList: editor.isActive('orderedList'),
                isCodeBlock: editor.isActive('codeBlock'),
                isBlockquote: editor.isActive('blockquote'),
                canUndo: editor.can().chain().focus().undo().run(),
                canRedo: editor.can().chain().focus().redo().run(),
            };
        },
    });
    if (!editor) {
        return null;
    }
    return (
        <div className={cn('overflow-hidden rounded-lg border', className)}>
            <div className="flex flex-wrap items-center gap-1 border-b p-2">
                <Toggle
                    size="sm"
                    pressed={editorState?.isBold}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBold().run()
                    }
                    disabled={!editorState?.canBold}
                >
                    <Bold className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isItalic}
                    onPressedChange={() =>
                        editor.chain().focus().toggleItalic().run()
                    }
                    disabled={!editorState?.canItalic}
                >
                    <Italic className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isStrike}
                    onPressedChange={() =>
                        editor.chain().focus().toggleStrike().run()
                    }
                    disabled={!editorState?.canStrike}
                >
                    <Strikethrough className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isCode}
                    onPressedChange={() =>
                        editor.chain().focus().toggleCode().run()
                    }
                    disabled={!editorState?.canCode}
                >
                    <Code className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="h-6" />
                <Toggle
                    size="sm"
                    pressed={editorState?.isHeading1}
                    onPressedChange={() =>
                        editor.commands.toggleHeading({ level: 1 })
                    }
                >
                    <Heading1 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isHeading2}
                    onPressedChange={() =>
                        editor.commands.toggleHeading({ level: 2 })
                    }
                >
                    <Heading2 className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isHeading3}
                    onPressedChange={() =>
                        editor.commands.toggleHeading({ level: 3 })
                    }
                >
                    <Heading3 className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="h-6" />
                <Toggle
                    size="sm"
                    pressed={editorState?.isBulletList}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isOrderedList}
                    onPressedChange={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />
                </Toggle>

                <Toggle
                    size="sm"
                    pressed={editorState?.isBlockquote}
                    onPressedChange={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                >
                    <Quote className="h-4 w-4" />
                </Toggle>
                <Separator orientation="vertical" className="h-6" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editorState?.canUndo}
                >
                    <Undo className="h-4 w-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editorState?.canRedo}
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            <EditorContent editor={editor} placeholder={placeholder} />
        </div>
    );
}
export { RichTextEditor, type RichTextEditorProps };
