import { Editor, rootCtx } from "@milkdown/kit/core"
import { commonmark } from "@milkdown/kit/preset/commonmark"
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react"
import { nord } from "@milkdown/theme-nord"
import React from "react"

interface MilkdownEditorProps {
  className?: string
}

const MilkdownEditor: React.FC<MilkdownEditorProps> = ({ className }) => {
  const editor = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx) => ctx.set(rootCtx, root))
      .use(commonmark)
  )

  return <Milkdown className={className?.toString() as string} />
}

interface MarkdownEditorProps {
  className?: string
}

export default function MarkdownEditor({ className }: MarkdownEditorProps) {
  return (
    <MilkdownProvider>
      <MilkdownEditor className={className} />
    </MilkdownProvider>
  )
}
