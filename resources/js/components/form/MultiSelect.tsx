import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { SelectOption } from '@/types';
import { Command as CommandPrimitive } from 'cmdk';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

type MultiSelectProps = {
    options: SelectOption[];
    selected: SelectOption[];
    setSelected: Dispatch<SetStateAction<SelectOption[]>>;
    placeholder?: string;
};

export function MultiSelect({
    options,
    selected,
    setSelected,
    placeholder,
}: MultiSelectProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleUnselect = useCallback((option: SelectOption) => {
        setSelected((prev) => prev.filter((s) => s.value !== option.value));
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === 'Delete' || e.key === 'Backspace') {
                    if (input.value === '') {
                        setSelected((prev) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === 'Escape') {
                    input.blur();
                }
            }
        },
        [],
    );

    const selectables = options.filter(
        (option) => !selected.some((s) => s.value === option.value),
    );

    return (
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent h-auto"
        >
            <div className="group rounded-md border border-input px-3 text-sm">
                <div className="flex flex-wrap items-center gap-1 py-1.5">
                    {selected.map((option) => {
                        return (
                            <Badge key={option.value} variant="secondary">
                                {option.label}
                                <button
                                    className="ml-1 rounded-full ring-offset-background outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUnselect(option);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(option)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={`${selected.length ? '' : (placeholder ?? 'Please Select')}`}
                        className="flex-1 border-none bg-transparent p-0 outline-none placeholder:text-sm placeholder:text-muted-foreground focus:border-none focus:ring-0 focus:outline-none"
                    />
                </div>
            </div>
            <div className="relative">
                <CommandList>
                    {open && selectables.length > 0 ? (
                        <div className="absolute top-0 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
                            <CommandGroup className="h-full overflow-auto">
                                {selectables.map((option) => {
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={(value) => {
                                                setInputValue('');
                                                setSelected((prev) => [
                                                    ...prev,
                                                    option,
                                                ]);
                                            }}
                                            className={'cursor-pointer'}
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {option.label}
                                                </span>
                                                {option.description && (
                                                    <span className="text-foreground/80">
                                                        {option.description}
                                                    </span>
                                                )}
                                            </div>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </div>
                    ) : null}
                </CommandList>
            </div>
        </Command>
    );
}
