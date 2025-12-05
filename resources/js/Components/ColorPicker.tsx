import React from "react";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { HexColorPicker } from "react-colorful";

interface ColorPickerFieldProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
    label?: string;
    name?: string;
}

export default function ColorPickerField({
     value,
     onChange,
     error,
     label = "Color",
     name = "color",
}: ColorPickerFieldProps) {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (!newValue.startsWith("#")) {
            newValue = "#" + newValue;
        }
        onChange(newValue);
    };

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <TextInput
                name={name}
                value={value}
                onChange={handleInputChange}
                maxLength={7}
                className="mt-3"
            />
            <HexColorPicker
                color={value}
                onChange={onChange}
            />
            {error && <span className="text-danger">{error}</span>}
        </div>
    );
}
