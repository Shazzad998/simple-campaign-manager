import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import contacts from '@/routes/contacts';
import { Contact } from '@/types/app';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';

type Props = {
    open: boolean;
    onOpenChange: (value: boolean) => void;
    contact: Contact | null;
};

const Form = ({ open, onOpenChange, contact }: Props) => {
    const { data, setData, post, put, processing, errors, clearErrors, reset } =
        useForm({
            name: contact?.name ?? '',
            email: contact?.email ?? '',
        });

    useEffect(() => {
        if (contact) {
            setData('name', contact.name);
            setData('email', contact.email);
        }
    }, [contact]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (contact) {
            put(contacts.update(contact.id).url, {
                onSuccess: () => closeSheet(),
            });
        } else {
            post(contacts.store().url, {
                onSuccess: () => closeSheet(),
            });
        }
    };
    const closeSheet = () => {
        onOpenChange(false);
        reset();
        clearErrors();
    };
    return (
        <Sheet open={open} onOpenChange={closeSheet}>
            <SheetContent className="w-full sm:max-w-xl">
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full w-full flex-col"
                >
                    <SheetHeader>
                        <SheetTitle>
                            {contact ? 'Edit' : 'Create'} Contact
                        </SheetTitle>
                        <SheetDescription>
                            {contact
                                ? 'Update the contact details below and save your changes.'
                                : 'Fill out the form below to create a new contact.'}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex-1 overflow-y-auto">
                        <div className="grid flex-1 auto-rows-min gap-6 p-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Contact Name</Label>

                                <div>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Name of the contact"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Contact Email</Label>

                                <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Email of the contact"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <SheetFooter>
                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}{' '}
                            {contact ? 'Update' : 'Save'} Contact
                        </Button>
                        <SheetClose asChild>
                            <Button variant={'secondary'}>Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default Form;
