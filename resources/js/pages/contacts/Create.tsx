import { Combobox } from '@/components/custom/ComboBox';
import { DatePicker } from '@/components/custom/DatePicker';
import SeparatedDatePicker from '@/components/custom/SeparatedDatePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { formatMoney } from '@/lib/utils';
import { dashboard } from '@/routes';
import customers from '@/routes/customers';
import districtAdmins from '@/routes/district-admins';
import salesAdmins from '@/routes/sales-admins';
import { SelectOption } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { List } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Customers',
        href: salesAdmins.index().url,
    },
    {
        title: 'Add Customer',
        href: '',
    },
];

interface CustomerForm {
    full_name: string;
    father_name: string;
    dob: string;
    nid: string;
    mobile: string;
    division_id: string;
    district_id: string;
    upazila_id: string;
    union_id: string;
    ward: string;
    card_type_id: string;
    card_no: string;
    photo: File | null; // <-- IMPORTANT
}

const Create = () => {
    const { data, setData, post, processing, errors, reset } =
        useForm<CustomerForm>({
            full_name: '',
            father_name: '',
            dob: '',
            nid: '',
            mobile: '',
            division_id: '',
            district_id: '',
            upazila_id: '',
            union_id: '',
            ward: '',
            card_type_id: '',
            card_no: '',
            photo: null,
        });

    const divisions = usePage().props.divisions as SelectOption[];
    const cardTypes = usePage().props.cardTypes as SelectOption[];

    const [cardType, setCardType] = useState<SelectOption | null | undefined>();
    const [districts, setDistricts] = useState<SelectOption[]>([]);
    const [upazilas, setUpazilas] = useState<SelectOption[]>([]);
    const [unions, setUnions] = useState<SelectOption[]>([]);
    const [division, setDivision] = useState<SelectOption | null | undefined>();
    const [district, setDistrict] = useState<SelectOption | null | undefined>();
    const [upazila, setUpazila] = useState<SelectOption | null | undefined>();
    const [union, setUnion] = useState<SelectOption | null | undefined>();
    const [price, setPrice] = useState(0);

    const [preview, setPreview] = useState<string | null>(null);

    // Load districts when division changes
    useEffect(() => {
        if (data.division_id) {
            fetch(`/location/districts/${data.division_id}`)
                .then((res) => res.json())
                .then((json) => {
                    setDistricts(json);
                    setDistrict(null);
                    setData('district_id', '');
                });
        }
    }, [data.division_id]);

    // Load upazilas when district changes
    useEffect(() => {
        if (data.district_id) {
            fetch(`/location/upazilas/${data.district_id}`)
                .then((res) => res.json())
                .then((json) => {
                    setUpazilas(json);
                    setUpazila(null);
                    setData('upazila_id', '');
                });
        }
    }, [data.district_id]);

    // Load unoions when upazila changes
    useEffect(() => {
        if (data.upazila_id) {
            fetch(`/location/unions/${data.upazila_id}`)
                .then((res) => res.json())
                .then((json) => {
                    setUnions(json);
                    setUnion(null);
                    setData('union_id', '');
                });
        }
    }, [data.upazila_id]);

    const resetData = () => {
        reset();
        setDistricts([]);
        setDistrict(null);
        setDivision(null);
        setUpazila(null);

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(customers.store().url, {
            onSuccess: () => resetData(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Customer" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Add Customer</h1>
                        <Link href={customers.index().url}>
                            <Button variant="outline">
                                <List className="mr-2 h-4 w-4" />
                                List Customers
                            </Button>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Photo */}
                                <div className="grid content-start gap-2">
                                    <div className="flex gap-2">
                                        {preview && (
                                            <img
                                                src={preview}
                                                className="h-16 w-16 rounded border object-cover"
                                            />
                                        )}
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="photo">
                                                Customer Photo
                                            </Label>
                                            <Input
                                                id="photo"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    setData(
                                                        'photo',
                                                        file ?? null,
                                                    );
                                                    setPreview(
                                                        file
                                                            ? URL.createObjectURL(
                                                                  file,
                                                              )
                                                            : null,
                                                    );
                                                }}
                                            />

                                            {errors.photo && (
                                                <p className="text-sm text-red-500">
                                                    {errors.photo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Name */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData('full_name', e.target.value)
                                        }
                                        placeholder="Enter full name"
                                    />
                                    {errors.full_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.full_name}
                                        </p>
                                    )}
                                </div>
                                {/* Father Name */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="father_name">
                                        Father's Name
                                    </Label>
                                    <Input
                                        id="father_name"
                                        value={data.father_name}
                                        onChange={(e) =>
                                            setData(
                                                'father_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter full name"
                                    />
                                    {errors.father_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.father_name}
                                        </p>
                                    )}
                                </div>
                                {/* Date of birth */}
                                <div className="grid content-start gap-2">
                                    <SeparatedDatePicker
                                        label="Date of birth"
                                        value={data.dob}
                                        onChange={(v) => setData('dob', v?? '')}
                                    />
                                    {errors.dob && (
                                        <p className="text-sm text-red-500">
                                            {errors.dob}
                                        </p>
                                    )}
                                </div>
                                {/* NID */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="nid">NID No.</Label>
                                    <Input
                                        id="nid"
                                        type="number"
                                        value={data.nid}
                                        onChange={(e) =>
                                            setData('nid', e.target.value)
                                        }
                                        placeholder="Enter full name"
                                    />
                                    {errors.nid && (
                                        <p className="text-sm text-red-500">
                                            {errors.nid}
                                        </p>
                                    )}
                                </div>

                                {/* Mobile */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="mobile">Mobile</Label>
                                    <Input
                                        id="mobile"
                                        type="text"
                                        value={data.mobile}
                                        onChange={(e) =>
                                            setData('mobile', e.target.value)
                                        }
                                        placeholder="Enter mobile"
                                    />
                                    {errors.mobile && (
                                        <p className="text-sm text-red-500">
                                            {errors.mobile}
                                        </p>
                                    )}
                                </div>

                                {/* Division */}
                                <div className="grid content-start gap-2">
                                    <Label>Division</Label>
                                    <Combobox
                                        options={divisions}
                                        selectedValue={division}
                                        setSelectedValue={(value) => {
                                            setDivision(value);
                                            setData(
                                                'division_id',
                                                value?.value ?? '',
                                            );
                                        }}
                                    />
                                    {errors.division_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.division_id}
                                        </p>
                                    )}
                                </div>
                                {/* District */}
                                <div className="grid content-start gap-2">
                                    <Label>District</Label>
                                    <Combobox
                                        options={districts}
                                        selectedValue={district}
                                        setSelectedValue={(value) => {
                                            setDistrict(value);
                                            setData(
                                                'district_id',
                                                value?.value ?? '',
                                            );
                                        }}
                                    />
                                    {errors.district_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.district_id}
                                        </p>
                                    )}
                                </div>
                                {/* District */}
                                <div className="grid content-start gap-2">
                                    <Label>Upazila</Label>
                                    <Combobox
                                        options={upazilas}
                                        selectedValue={upazila}
                                        setSelectedValue={(value) => {
                                            setUpazila(value);
                                            setData(
                                                'upazila_id',
                                                value?.value ?? '',
                                            );
                                        }}
                                    />
                                    {errors.upazila_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.upazila_id}
                                        </p>
                                    )}
                                </div>
                                {/* Union */}
                                <div className="grid content-start gap-2">
                                    <Label>Union</Label>
                                    <Combobox
                                        options={unions}
                                        selectedValue={union}
                                        setSelectedValue={(value) => {
                                            setUnion(value);
                                            setData(
                                                'union_id',
                                                value?.value ?? '',
                                            );
                                        }}
                                    />
                                    {errors.union_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.union_id}
                                        </p>
                                    )}
                                </div>

                                {/* Ward */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="ward">Ward</Label>

                                    <Select
                                        value={data.ward}
                                        onValueChange={(value) =>
                                            setData('ward', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select ward" />
                                        </SelectTrigger>

                                        <SelectContent className="max-w-70">
                                            <SelectGroup>
                                                {Array.from(
                                                    { length: 9 },
                                                    (_, i) => i + 1,
                                                ).map((num) => (
                                                    <SelectItem
                                                        key={num}
                                                        value={String(num)}
                                                    >
                                                        Ward No - {num}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    {errors.ward && (
                                        <p className="text-sm text-red-500">
                                            {errors.ward}
                                        </p>
                                    )}
                                </div>

                                {/* Card Type */}
                                <div className="grid content-start gap-2">
                                    <Label>Card Type</Label>
                                    <Combobox
                                        options={cardTypes}
                                        selectedValue={cardType}
                                        setSelectedValue={(value) => {
                                            setCardType(value);
                                            setData(
                                                'card_type_id',
                                                value?.value ?? '',
                                            );
                                            setPrice(
                                                value?.description
                                                    ? Number(value?.description)
                                                    : 0,
                                            );
                                        }}
                                    />
                                    {errors.card_type_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.card_type_id}
                                        </p>
                                    )}
                                </div>

                                {/* Card No */}
                                <div className="grid content-start gap-2">
                                    <Label htmlFor="card_no">Card No</Label>
                                    <Input
                                        id="card_no"
                                        type="number"
                                        value={data.card_no}
                                        onChange={(e) =>
                                            setData('card_no', e.target.value)
                                        }
                                        placeholder="Enter Card No"
                                    />
                                    {errors.card_no && (
                                        <p className="text-sm text-red-500">
                                            {errors.card_no}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-8 pt-4">
                                <div className="text-xl font-bold">
                                    {formatMoney(price)}
                                </div>
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />} Save Customer
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
