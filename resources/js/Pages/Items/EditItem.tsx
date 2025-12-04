import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import SelectInput from "@/Pages/components/Inputs/SelectInput";
import { useFilters } from "@/Hooks/useFilters";
import Spinner from "@/Components/Spinner";
import ItemApi from "@/API/ItemApi";
import { router, usePage } from '@inertiajs/react';
import Modal from "@/Components/Modal";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

interface InputErrors {
    [key: string]: string[];
}

export default function EditItem() {
    const { itemId } = usePage<{ itemId: number }>().props;
    const { allRarity, allFoundIn, allItemTypes, loading: filtersLoading } = useFilters();

    const [formData, setFormData] = useState({
        item_name: "",
        price: "",
        icon: "",
        description: "",
        found_in_id: "",
        rarity_id: "",
        item_type_id: "",
    });

    const [inputErrors, setInputErrors] = useState<InputErrors>({});
    const [showModal, setShowModal] = useState(false);
    const [loadingItem, setLoadingItem] = useState(true);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const data = await ItemApi.getItemById(itemId);
                setFormData({
                    item_name: data.item_name,
                    price: data.price,
                    icon: data.icon,
                    description: data.description,
                    found_in_id: data.found_in_id,
                    rarity_id: data.rarity_id,
                    item_type_id: data.item_type_id,
                });
            } catch (error) {
                console.error("Error fetching item:", error);
            } finally {
                setLoadingItem(false);
            }
        };
        fetchItem();
    }, [itemId]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInputErrors({});
        try {
            await ItemApi.updateItem(itemId, formData);
            setShowModal(true);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setInputErrors(error.response.data.errors);
            } else {
                console.error("Error updating item:", error);
            }
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route('items.list'));
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

    const textareaFields = [
        { name: 'description', label: 'Description' },
    ];

    const selectFields = [
        { name: 'found_in_id', label: 'Found In', options: Object.fromEntries(allFoundIn.map(r => [r.id, r.found_in_name])) },
        { name: 'rarity_id', label: 'Rarity', options: Object.fromEntries(allRarity.map(r => [r.id, r.rarity_name])) },
        { name: 'item_type_id', label: 'Item Type', options: Object.fromEntries(allItemTypes.map(r => [r.id, r.item_type_name])) },
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
                                className="form-control"
                                name={f.name}
                                value={formData[f.name as keyof typeof formData]}
                                onChange={handleChange}
                                required={f.required}
                            />
                            {renderError(f.name)}
                        </div>
                    ))}

                    {textareaFields.map(f => (
                        <div className="mb-3" key={f.name}>
                            <label className="form-label">{f.label}</label>
                            <textarea
                                className="form-control"
                                name={f.name}
                                value={formData[f.name as keyof typeof formData]}
                                onChange={handleChange}
                            />
                            {renderError(f.name)}
                        </div>
                    ))}

                    <div className="row">
                        {selectFields.map(f => (
                            <div className="mb-3 col" key={f.name}>
                                <label className="form-label">{f.label}</label>
                                <SelectInput
                                    options={f.options}
                                    value={formData[f.name as keyof typeof formData]}
                                    onValueChange={value => handleSelectChange(f.name, value)}
                                />
                                {renderError(f.name)}
                            </div>
                        ))}
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
