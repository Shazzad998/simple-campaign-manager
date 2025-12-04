import { Combobox } from '@/components/custom/ComboBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import cards from '@/routes/cards';
import districtAdmins from '@/routes/district-admins';
import salesAdmins from '@/routes/sales-admins';
import { SelectOption } from '@/types';
import { SalesAdmin } from '@/types/app';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { List } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Sales Admins',
        href: cards.index().url,
    },
    {
        title: 'Edit Sales Admin',
        href: '',
    },
];

const Edit = () => {
    const salesAdmin = usePage().props.salesAdmin as SalesAdmin;
    const { data, setData, put, processing, errors, reset } = useForm({
        full_name: salesAdmin.full_name ?? '',
        mobile: salesAdmin.mobile ?? '',
        division_id: salesAdmin.division_id ?? '',
        district_id: salesAdmin.district_id ?? '',
        upazila_id: salesAdmin.upazila_id ?? '',
        union_id: salesAdmin.union_id ?? '',
        ward: salesAdmin.ward ?? '',
    });
    console.log("data", data)

    const divisions = usePage().props.divisions as SelectOption[];
    const [districts, setDistricts] = useState<SelectOption[]>(
        usePage().props.districts as SelectOption[],
    );
    const [upazilas, setUpazilas] = useState<SelectOption[]>(
        usePage().props.upazilas as SelectOption[],
    );
    const [unions, setUnions] = useState<SelectOption[]>(
        usePage().props.unions as SelectOption[],
    );
    const [division, setDivision] = useState<SelectOption | null | undefined>(
        divisions.find((d) => d.value == salesAdmin.division_id),
    );
    const [district, setDistrict] = useState<SelectOption | null | undefined>(
        districts.find((d) => d.value == salesAdmin.district_id),
    );
    const [upazila, setUpazila] = useState<SelectOption | null | undefined>(
        upazilas.find((d) => d.value == salesAdmin.upazila_id),
    );
    const [union, setUnion] = useState<SelectOption | null | undefined>(
        unions.find((d) => d.value == salesAdmin.union_id),
    );

    // Load districts when division changes
    useEffect(() => {
        if (data.division_id) {
            fetch(`/location/districts/${data.division_id}`)
                .then((res) => res.json())
                .then((json) => {
                    setDistricts(json);
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
                });
        }
    }, [data.upazila_id]);

    const resetData = () => {
        reset();
        setDistricts([]);
        setUpazilas([]);
        setUnions([]);
        setDistrict(null);
        setDivision(null);
        setUpazila(null);
        setUnion(null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(salesAdmins.update(salesAdmin.id).url, {
            onSuccess: () => resetData(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit District Admin" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Edit Sales Admin</h1>
                        <Link href={districtAdmins.index().url}>
                            <Button variant="outline">
                                <List className="mr-2 h-4 w-4" />
                                List Sales Admin
                            </Button>
                        </Link>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid gap-8"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) =>
                                            setData('full_name', e.target.value)
                                        }
                                        placeholder="Enter card name"
                                    />
                                    {errors.full_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.full_name}
                                        </p>
                                    )}
                                </div>

                                {/* Mobile */}
                                <div className="grid gap-2">
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
                                <div className="grid gap-2">
                                    <Label>Division</Label>
                                    <Combobox
                                        options={divisions}
                                        selectedValue={division}
                                        setSelectedValue={(value) => {
                                            setDivision(value);
                                            setDistrict(null);
                                            setUpazila(null);
                                            setUnion(null);
                                            setData('district_id', '');
                                            setData('upazila_id', '');
                                            setData('union_id', '');
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
                                <div className="grid gap-2">
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

                                            setUpazila(null);
                                            setUnion(null);
                                            setData('upazila_id', '');
                                            setData('union_id', '');
                                        }}
                                    />
                                    {errors.district_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.district_id}
                                        </p>
                                    )}
                                </div>
                                {/* District */}
                                <div className="grid gap-2">
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
                                            setUnion(null);
                                            setData('union_id', '');
                                        }}
                                    />
                                    {errors.upazila_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.upazila_id}
                                        </p>
                                    )}
                                </div>
                                {/* Union */}
                                <div className="grid gap-2">
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
                                <div className="grid gap-2">
                                    <Label htmlFor="ward">Ward</Label>
                                    <Input
                                        id="ward"
                                        type='number'
                                        value={data.ward}
                                        onChange={(e) =>
                                            setData('ward', e.target.value)
                                        }
                                        placeholder="Enter ward no"
                                    />
                                    {errors.ward && (
                                        <p className="text-sm text-red-500">
                                            {errors.ward}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing && <Spinner />} Update Admin
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
