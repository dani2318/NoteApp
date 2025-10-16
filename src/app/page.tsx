'use client';
import { AppMenuBar, StrumentsAppBar } from '@/components/app-menubar'
import MarkdownEditor from "@/components/editor"
import { EditorProvider } from "@/components/editor-context"
export default function Home() {

  return (
    <>
      <html lang="en" className="w-screen h-screen" suppressHydrationWarning>
        <body className="w-screen h-screen" suppressHydrationWarning>
          <AppMenuBar />
          <EditorProvider>
            <StrumentsAppBar />
            <MarkdownEditor className='w-full h-full bg-white' />
          </EditorProvider>
        </body>
      </html>
    </>
  );
}
