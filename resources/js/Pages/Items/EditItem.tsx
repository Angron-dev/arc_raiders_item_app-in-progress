import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import SelectInput from "@/Pages/components/Inputs/SelectInput";
import { useFilters } from "@/Hooks/useFilters";
import Spinner from "@/Components/Spinner";
import ItemApi from "@/API/ItemApi";
import { router, usePage } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import React, { useEffect, useState } from "react";
import { route } from "ziggy-js";
import MultiCheckboxSelect from "@/Pages/components/Inputs/MultipleCheckboxSelect";

interface InputErrors {
    [key: string]: string[];
}

type EditItemFormData = {
    item_name: string;
    price: string;
    icon: string;
    description: string;
    loot_areas: number[];
    rarity_id: string;
    item_type_id: string;
};

export default function EditItem() {
    const { itemId } = usePage<{ itemId: number }>().props;
    const { allRarity, allLootArea, allItemTypes, loading: filtersLoading } = useFilters();

    const [formData, setFormData] = useState<EditItemFormData>({
        item_name: "",
        price: "",
        icon: "",
        description: "",
        loot_areas: [],
        rarity_id: "",
        item_type_id: "",
    });

    const [inputErrors, setInputErrors] = useState<InputErrors>({});
    const [showModal, setShowModal] = useState(false);
    const [loadingItem, setLoadingItem] = useState(true);

    const fetchItem = React.useCallback(async () => {
        try {
            const data = await ItemApi.getItemById(itemId);
            setFormData({
                item_name: data.item_name,
                price: data.price,
                icon: data.icon,
                description: data.description,
                loot_areas: data.loot_areas.map((a: { id: number }) => a.id),
                rarity_id: data.rarity_id,
                item_type_id: data.item_type_id,
            });
        } catch (error) {
            console.error("Error fetching item:", error);
        } finally {
            setLoadingItem(false);
        }
    }, [itemId]);

    useEffect(() => {
        fetchItem();
    }, [fetchItem]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: name === "price" ? value.replace(/\D/g, "") : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleModalOk = async () => {
        try {
            setInputErrors({});
            await ItemApi.updateItem(itemId, formData);
            setShowModal(false);
            router.get(route('items.list'));
        } catch (error: any) {
            setShowModal(false);
            if (error.response?.data?.errors) {
                setInputErrors(error.response.data.errors);
            } else {
                console.error("Error updating item:", error);
            }
        }
    };

    const renderError = (field: string) => {
        if (!inputErrors[field]) return null;
        return <p className="text-danger">{inputErrors[field][0]}</p>;
    };

    if (loadingItem || filtersLoading) return (
        <Header>
            <Container><Spinner /></Container>
        </Header>
    );

    const textFields = [
        { name: 'item_name', label: 'Item Name', required: true },
        { name: 'price', label: 'Price' },
        { name: 'icon', label: 'Icon (URL)' },
    ];

    return (
        <Header>
            <Container>
                <h1 className="text-center mb-4">Edit Item</h1>

                <form onSubmit={handleSubmit}>
                    {textFields.map(f => (
                        <div className="mb-3" key={f.name}>
                            <label className="form-label">{f.label}</label>
                            <TextInput
                                name={f.name}
                                value={formData[f.name as keyof typeof formData]}
                                onChange={handleChange}
                                required={f.required}
                            />
                            {renderError(f.name)}
                        </div>
                    ))}

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {renderError("description")}
                    </div>

                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Loot Areas</label>

                            <MultiCheckboxSelect
                                options={Object.fromEntries(
                                    allLootArea.map(a => [a.id, a.loot_area_name])
                                )}
                                value={formData.loot_areas}
                                onChange={(value) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        loot_areas: value,
                                    }))
                                }
                            />

                            {renderError("loot_areas")}
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Rarity</label>
                            <SelectInput
                                options={Object.fromEntries(
                                    allRarity.map(r => [r.id, r.rarity_name])
                                )}
                                value={formData.rarity_id}
                                onValueChange={(value) =>
                                    setFormData(prev => ({ ...prev, rarity_id: value }))
                                }
                            />
                            {renderError("rarity_id")}
                        </div>

                        <div className="mb-3 col">
                            <label className="form-label">Item Type</label>
                            <SelectInput
                                options={Object.fromEntries(
                                    allItemTypes.map(t => [t.id, t.item_type_name])
                                )}
                                value={formData.item_type_id}
                                onValueChange={(value) =>
                                    setFormData(prev => ({ ...prev, item_type_id: value }))
                                }
                            />
                            {renderError("item_type_id")}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Update Item</button>
                </form>

                <Modal
                    show={showModal}
                    title="Item Updated"
                    description="Are you sure you want to update this item?"
                    onClose={() => setShowModal(false)}
                    onClick={handleModalOk}
                />
            </Container>
        </Header>
    );
}
