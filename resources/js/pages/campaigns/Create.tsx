
import { MultiSelect } from '@/components/form/MultiSelect';
import { RichTextEditor } from '@/components/form/RichTextEditor';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import campaigns from '@/routes/campaigns';
import { SelectOption } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { List, Send } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Campaigns',
        href: campaigns.index().url,
    },
    {
        title: 'Add Campaign',
        href: '',
    },
];

type CreateProps = {
    contactOptions: SelectOption[];
};

const Create = ({ contactOptions }: CreateProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<{
        subject: string;
        body: string;
        recipients: number[];
    }>({
        subject: '',
        body: '',
        recipients: [],
    });

    const [selectedUsers, setSelectedUsers] = useState<SelectOption[]>([]);
    useEffect(() => {
        setData(
            'recipients',
            selectedUsers.map((item) => Number(item.value)),
        );
    }, [selectedUsers]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(campaigns.store().url, {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Campaign" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Add Campaign</div>
                        <Link href={campaigns.index().url}>
                            <Button variant="outline">
                                <List className="mr-2 h-4 w-4" />
                                List Campaigns
                            </Button>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8">
                    <Card className="max-w-2xl">
                        <CardHeader>
                            <CardTitle>Campaign Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {/* Recipients */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="recipients">Contacts</Label>
                                    <div className="grid gap-px">
                                        <MultiSelect
                                            options={contactOptions}
                                            selected={selectedUsers}
                                            setSelected={setSelectedUsers}
                                            placeholder="Select Contacts"
                                        />
                                        <InputError
                                            message={errors.recipients}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                {/* Subject */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <div className="grid gap-px">
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) =>
                                                setData(
                                                    'subject',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter campaign subject"
                                        />
                                        <InputError message={errors.subject} />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="body">Campaign Body</Label>
                                    <div className="grid gap-px">
                                        <RichTextEditor
                                            content={data.body}
                                            onChange={(value) => setData('body', value)}
                                            placeholder="Start typing your content here..."
                                            className="min-h-[400px]"
                                        />

                                        {/* <Textarea
                                            value={data.body}
                                            onChange={(e) =>
                                                setData('body', e.target.value)
                                            }
                                            placeholder="Enter campaign body"
                                        /> */}
                                        <InputError message={errors.body} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-8 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />} Send <Send />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
};

export default Create;
