import * as React from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type SeparatedDatePickerProps = {
    value?: string | null;
    onChange?: (value: string | null) => void;
    label?: string;
    className?: string;
};

export default function SeparatedDatePicker({
    value,
    onChange,
    label,
    className,
}: SeparatedDatePickerProps) {
    const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
    const [selectedMonth, setSelectedMonth] = React.useState<number | null>(null);
    const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

    // Reset internal state when parent reset()
    React.useEffect(() => {
        if (!value) {
            setSelectedYear(null);
            setSelectedMonth(null);
            setSelectedDay(null);
        }
    }, [value]);

    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const daysInMonth = (year: number, month: number) =>
        new Date(year, month, 0).getDate();

    const updateValue = (year: number | null, month: number | null, day: number | null) => {
        if (year && month && day) {
            const formatted = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
                2,
                "0"
            )}`;
            onChange?.(formatted);
        } else {
            onChange?.(null);
        }
    };

    return (
        <div className={className}>
            {label && <label className="block mb-2 font-medium">{label}</label>}
            <div className=" grid grid-cols-3 gap-y-1 gap-x-2">

            {/* YEAR */}
            <Select
                value={selectedYear ? String(selectedYear) : ""}
                onValueChange={(v) => {
                    const year = Number(v);
                    setSelectedYear(year);
                    updateValue(year, selectedMonth, selectedDay);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* MONTH */}
            <Select
                value={selectedMonth ? String(selectedMonth) : ""}
                onValueChange={(v) => {
                    const month = Number(v);
                    setSelectedMonth(month);
                    updateValue(selectedYear, month, selectedDay);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((month, i) => (
                        <SelectItem key={i} value={String(i + 1)}>
                            {month}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* DAY */}
            <Select
                disabled={!selectedYear || !selectedMonth}
                value={selectedDay ? String(selectedDay) : ""}
                onValueChange={(v) => {
                    const day = Number(v);
                    setSelectedDay(day);
                    updateValue(selectedYear, selectedMonth, day);
                }}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                    {selectedYear &&
                        selectedMonth &&
                        Array.from(
                            { length: daysInMonth(selectedYear, selectedMonth) },
                            (_, i) => i + 1
                        ).map((day) => (
                            <SelectItem key={day} value={String(day)}>
                                {day}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            </div>

        </div>
    );
}
