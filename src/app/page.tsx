import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { ModeToggle } from "@/components/theme-switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FontCombobox } from "@/components/font-combobox"
import { FontSizeCombobox } from "@/components/font-size"

export default function Home() {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <main className="w-screen h-screen" suppressHydrationWarning>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                  <MenubarSeparator />
                  <ModeToggle />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <Menubar className="h-fit">
              <ToggleGroup variant="outline" type="multiple" className="ml-2 mr-2">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
              <FontCombobox />
              <FontSizeCombobox />

              <ToggleGroup variant="outline" type="single" className="ml-2 mr-2">
                <ToggleGroupItem value="al-left" aria-label="Align text left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="al-cent" aria-label="Align text center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="al-right" aria-label="Align text right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </Menubar>

          </main>
        </body>
      </html>

    </>
  );
}
