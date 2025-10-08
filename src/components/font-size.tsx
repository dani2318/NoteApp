"use client"
import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function FontSizeCombobox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    
    // Generate font sizes from 8px to 72px
    const fontSizes = React.useMemo(() => {
        const sizes = [];
        for (let i = 8; i <= 72; i++) {
            sizes.push({
                value: i.toString(),
                label: `${i}px`
            });
        }
        return sizes;
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? fontSizes.find((size) => size.value === value)?.label
                        : "Select size..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>---------</CommandEmpty>
                        <CommandGroup>
                            {fontSizes.map((size) => (
                                <CommandItem
                                    key={size.value}
                                    value={size.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === size.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {size.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}