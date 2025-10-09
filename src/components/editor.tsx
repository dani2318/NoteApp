import { useEditor } from '@/components/editor-context'

export default function Editor() {
  const { textareaRef, content, setContent } = useEditor()

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    setContent(e.currentTarget.innerHTML)
  }

  return (
    <div
      contentEditable={true}
      ref={textareaRef}
      onInput={handleInput}
      className="outline-0 m-auto mt-5 w-155 h-219 bg-amber-50 text-black overflow-auto text-1xl p-5"
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      aria-multiline="true"
    />
  )
}