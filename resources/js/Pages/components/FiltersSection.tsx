import SelectInput from "../components/Inputs/SelectInput.js";
import { Dispatch, SetStateAction } from 'react';
import Filters from "../../Models/Filters";
import TextInput from "./Inputs/TextInput";

export interface FiltersSectionProps {
    allRarity: { id: number; rarity_name: string }[];
    allFoundIn: { id: number; found_in_name: string }[];
    allItemTypes: { id: number; item_type_name: string }[];
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
}

const toOptions = <T extends Record<string, any>>(
    arr: T[],
    key: keyof T,
    label: keyof T
): Record<string | number, string> =>
    arr.reduce((acc, item) => ({ ...acc, [item[key]]: String(item[label]) }), {});

export default function FiltersSection({
   allRarity,
   allFoundIn,
   allItemTypes,
   filters,
   setFilters
}: FiltersSectionProps) {

    type SelectFilter<T> = {
        name: keyof Filters;
        placeholder: string;
        list: T[];
        label: keyof T;
    };

    const selectFilters: (
        | SelectFilter<{ id: number; rarity_name: string }>
        | SelectFilter<{ id: number; found_in_name: string }>
        | SelectFilter<{ id: number; item_type_name: string }>
        )[] = [
        {
            name: "rarity",
            placeholder: "Rarity",
            list: allRarity,
            label: "rarity_name"
        },
        {
            name: "foundIn",
            placeholder: "Found in",
            list: allFoundIn,
            label: "found_in_name"
        },
        {
            name: "itemType",
            placeholder: "Type",
            list: allItemTypes,
            label: "item_type_name"
        }
    ];

    return (
        <div className='d-flex justify-content-center align-items-end mb-3'>

            <TextInput
                name="itemName"
                placeholder="Item Name"
                value={filters.itemName ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFilters(prev => ({ ...prev, itemName: e.target.value }))
                }
            />

            {selectFilters.map(filter => (
                <SelectInput
                    key={filter.name}
                    className="me-3 w-25"
                    name={filter.name}
                    optionPlaceholder={filter.placeholder}
                    options={toOptions(filter.list, "id", filter.label)}
                    value={filters[filter.name] ?? ""}
                    onValueChange={(value) =>
                        setFilters(prev => ({ ...prev, [filter.name]: value }))
                    }
                />
            ))}

        </div>
    );
}
