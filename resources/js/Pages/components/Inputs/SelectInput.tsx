import React, { useState } from 'react';

export type SelectOptions = { [key: PropertyKey]: string };

type Props = Readonly<
    React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: SelectOptions;
    optionPlaceholder?: string | null;
    onValueChange?: ((value: string) => void) | null;
}
>;

function SelectInput({ className, options, value, onValueChange = null, optionPlaceholder = null, ...props }: Props) {
    const [selectedValue, setSelectedValue] = useState<string>(String(value));
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
        onValueChange?.(selectedOption);
    };

    return (
        <div className={`input-group mb-3 ${className ?? ""}`}>
            <label htmlFor={props.id ?? props.name} className='text-body-tertiary mb-2 mx-auto'>
                {optionPlaceholder}
            </label>
            <select
                className="custom-select w-100"
                {...props}
                id={props.id ?? props.name}
                value={selectedValue}
                onChange={handleChange}
            >
                <option value="">--</option>
                {Object.keys(options).map((code) => (
                    <option key={code} value={code}>
                        {options[code]}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;
