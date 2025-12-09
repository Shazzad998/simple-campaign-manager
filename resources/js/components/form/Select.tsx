import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SelectOption } from '@/types';

type ComboboxProps = {
    options: SelectOption[];
    selectedValue: SelectOption | null | undefined;
    setSelectedValue: (value: SelectOption | null) => void;
    placeholder?: string;
    className?: string;
};

export function Combobox({ options, selectedValue, setSelectedValue, placeholder = '', className }: ComboboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    // className={cn('justify-between overflow-hidden', className)}
                >
                    {selectedValue ? (
                        <span className="max-w-full truncate">{selectedValue.label}</span>
                    ) : (
                        <span className="text-muted-foreground">{placeholder != ''? placeholder : "Please Select"}</span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align='start'>
                <Command>
                    <CommandInput placeholder="Search item..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                           {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={(value) => {
                                        setSelectedValue(
                                            options.find(
                                                (opt) => opt.label == value
                                            ) || null
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    <div className=' flex items-center gap-1'>
                                        {option.image && (<div className=' rounded overflow-hidden bg-secondary p-0.5 size-8'><img src={'/'+ option.image} alt={option.label} className='  object-contain' /> </div>)}
                                        <div className='flex flex-col'>
                                            <span className='font-medium'>{option.label}</span>
                                            {option.description && (<span className=' text-foreground/80'>{option.description}</span>)}
                                        </div>
                                    </div>
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selectedValue?.value ===
                                                option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
