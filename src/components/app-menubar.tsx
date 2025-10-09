import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/components/theme-switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FontCombobox } from "@/components/font-combobox";
import { FontSizeCombobox } from "@/components/font-size";
import { useEditor } from '@/components/editor-context'

import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";

export function AppMenuBar() {
    return (
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
    )
}

interface ToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement>
    content: string
    setContent: (content: string) => void
}



export function StrumentsAppBar() {

    const { textareaRef, content, setContent } = useEditor()

    const handleBoldToggle = () => {
        const div = textareaRef.current;
        if (!div) return;

        div.focus();

        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return;

        const range = sel.getRangeAt(0);
        const selectedText = sel.toString();
        if (!selectedText) return;

        // Create your wrapper element
        const wrapper = document.createElement('span');
        wrapper.className = 'your-bold-class';  // optional styling class
        wrapper.textContent = selectedText;

        // Delete the current selection
        range.deleteContents();

        // Insert the wrapper
        range.insertNode(wrapper);

        // Move the caret to after the inserted wrapper
        const newRange = document.createRange();
        newRange.setStartAfter(wrapper);
        newRange.collapse(true);

        sel.removeAllRanges();
        sel.addRange(newRange);

        // Trigger input to update your state
        div.dispatchEvent(new Event('input', { bubbles: true }));
    };


    return (
        <Menubar className="h-fit">
            <ToggleGroup
                variant="outline"
                type="multiple"
                className="ml-2 mr-2"
            >
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={handleBoldToggle}>
                    <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="strikethrough"
                    aria-label="Toggle strikethrough"
                >
                    <Underline className="h-4 w-4" />
                </ToggleGroupItem>
            </ToggleGroup>
            <FontCombobox />
            <FontSizeCombobox />

            <ToggleGroup
                variant="outline"
                type="single"
                className="ml-2 mr-2"
            >
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
    )
}