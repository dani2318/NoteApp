'use client';
import { AppMenuBar, StrumentsAppBar} from '@/components/app-menubar'
import { useState, useRef } from "react"
import { useEditor } from '@/components/editor-context'
import Editor from "@/components/editor"
import { EditorProvider } from "@/components/editor-context"
export default function Home() {

  return (
    <>
      <html lang="en" className="w-screen h-screen" suppressHydrationWarning>
        <body className="w-screen h-screen">
            <AppMenuBar/>
            <EditorProvider>
              <StrumentsAppBar/>
              <Editor />
            </EditorProvider>
        </body>
      </html>
    </>
  );
}
