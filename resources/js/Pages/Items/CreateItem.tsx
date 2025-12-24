import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import React, { useState } from "react";
import SelectInput from "@/Pages/components/Inputs/SelectInput";
import { useFilters } from "@/Hooks/useFilters";
import Spinner from "@/Components/Spinner";
import ItemApi from "@/API/ItemApi";
import { router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import MultiCheckboxSelect from "@/Pages/components/Inputs/MultipleCheckboxSelect";

interface InputErrors {
    [key: string]: string[];
}

type CreateItemFormData = {
    item_name: string;
    price: string;
    icon: string;
    description: string;
    loot_areas: number[];
    rarity_id: string;
    item_type_id: string;
};

export default function CreateItem() {
    const [showModal, setShowModal] = useState(false);
    const [inputErrors, setInputErrors] = useState<InputErrors>({});

    const { allRarity, allLootArea, allItemTypes, loading } = useFilters();

    const [formData, setFormData] = useState<CreateItemFormData>({
        item_name: "",
        price: "",
        icon: "",
        description: "",
        loot_areas: [],
        rarity_id: "",
        item_type_id: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputErrors({});

        try {
            await ItemApi.createItem(formData);
            setShowModal(true);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setInputErrors(error.response.data.errors);
            } else {
                console.error("Error creating item:", error);
            }
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("items.list"));
    };

    const renderError = (field: string) =>
        inputErrors[field] && (
            <p className="text-danger">{inputErrors[field][0]}</p>
        );

    return (
        <Header>
            <Container>
                <h1 className="text-center">Create Item</h1>

                <form className="container mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Item Name</label>
                        <TextInput
                            name="item_name"
                            value={formData.item_name}
                            onChange={handleChange}
                            required
                        />
                        {renderError("item_name")}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <TextInput
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {renderError("price")}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Icon (URL)</label>
                        <TextInput
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                        />
                        {renderError("icon")}
                    </div>

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

                    {loading ? (
                        <Spinner />
                    ) : (
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
                                        allRarity.map(r => [
                                            r.id,
                                            r.rarity_name,
                                        ])
                                    )}
                                    value={formData.rarity_id}
                                    onValueChange={value =>
                                        setFormData(prev => ({
                                            ...prev,
                                            rarity_id: value,
                                        }))
                                    }
                                />
                                {renderError("rarity_id")}
                            </div>

                            <div className="mb-3 col">
                                <label className="form-label">Item Type</label>
                                <SelectInput
                                    options={Object.fromEntries(
                                        allItemTypes.map(t => [
                                            t.id,
                                            t.item_type_name,
                                        ])
                                    )}
                                    value={formData.item_type_id}
                                    onValueChange={value =>
                                        setFormData(prev => ({
                                            ...prev,
                                            item_type_id: value,
                                        }))
                                    }
                                />
                                {renderError("item_type_id")}
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary">
                        Create Item
                    </button>
                </form>

                <Modal
                    show={showModal}
                    title="Item Added"
                    description="Item has been added successfully"
                    onClose={() => setShowModal(false)}
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
