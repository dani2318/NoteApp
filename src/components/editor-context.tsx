// EditorContext.tsx
import { createContext, useContext, useRef, useState, ReactNode } from "react"

interface EditorContextType {
  content: string
  setContent: (content: string) => void
  textareaRef: React.RefObject<HTMLDivElement>
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState("")
  const textareaRef = useRef<HTMLDivElement>(null)
  if (textareaRef)
    return (
        <EditorContext.Provider value={{ content, setContent, textareaRef }}>
        {children}
        </EditorContext.Provider>
    )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error("useEditor must be used within EditorProvider")
  }
  return context
}