import React, { useState } from "react";

export type CheckboxOptions = {
    [key: number]: string;
};

type Props = {
    options: CheckboxOptions;
    value: number[];
    onChange: (value: number[]) => void;
    label?: string;
    className?: string;
};

export default function MultiCheckboxSelect({
                                                options,
                                                value,
                                                onChange,
                                                label = "Select options",
                                                className,
                                            }: Props) {
    const [open, setOpen] = useState(false);

    const toggleValue = (id: number) => {
        if (value.includes(id)) {
            onChange(value.filter(v => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    return (
        <div className={`border rounded ${className ?? ""}`}>
            {/* HEADER */}
            <button
                type="button"
                className="w-100 d-flex justify-content-between align-items-center p-2 bg-light border-0"
                onClick={() => setOpen(prev => !prev)}
            >
                <span>
                    {label}
                    {value.length > 0 && (
                        <small className="text-muted ms-2">
                            ({value.length} selected)
                        </small>
                    )}
                </span>
                <span>{open ? "▲" : "▼"}</span>
            </button>

            {/* OPTIONS */}
            {open && (
                <div className="p-2">
                    {Object.entries(options).map(([id, label]) => {
                        const numericId = Number(id);
                        const checked = value.includes(numericId);

                        return (
                            <label
                                key={id}
                                className="d-flex align-items-center gap-2 mb-1 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    className="form-check-input m-0"
                                    checked={checked}
                                    onChange={() => toggleValue(numericId)}
                                />
                                <span>{label}</span>
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
