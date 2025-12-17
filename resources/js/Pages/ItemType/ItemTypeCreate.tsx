import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import ItemTypeApi from "@/API/ItemTypeApi";

interface TypeErrors {
    [key: string]: string[];
}

export default function ItemTypeCreate() {
    const [showModal, setShowModal] = useState(false);
    const [itemTypeErrors, setItemTypeErrors] = useState<TypeErrors>({});
    const [formData, setFormData] = useState({
        item_type_name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setItemTypeErrors({});

        try {
            await ItemTypeApi.createItemType(formData);
            setShowModal(true);
        } catch (error: any) {
            setItemTypeErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("item_type.list"));
    };

    return (
        <Header>
            <Container>
                <h2>Create Item Type</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label"> Item Type Name</label>
                        <TextInput
                            name="item_type_name"
                            value={formData.item_type_name}
                            onChange={handleChange}
                        />
                        <span className="text-danger">
                            {itemTypeErrors["item_type_name"]?.[0]}
                        </span>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="Item Type Created"
                    description="Item type created successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
