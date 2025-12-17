import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import ItemTypeApi from "@/API/ItemTypeApi";

interface ItemTypeErrors {
    [key: string]: string[];
}
export default function ItemTypeEdit() {
    const { itemTypeId } = usePage<{ itemTypeId: number }>().props;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [itemTypeErrors, setItemTypeErrors] = useState<ItemTypeErrors>({});
    const [formData, setFormData] = useState({
        item_type_name: "",
        color: "#000000",
    });

    useEffect(() => {
        ItemTypeApi.getItemTypeById(itemTypeId).then((data) => {
            setFormData(data);
            setLoading(false);
        });
    }, [itemTypeId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "color" && !value.startsWith("#")) {
            newValue = "#" + value;
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setItemTypeErrors({});

        try {
            await ItemTypeApi.updateItemType(itemTypeId, formData);
            setShowModal(true);
        } catch (error: any) {
            setItemTypeErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("item_type.list"));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Header>
            <Container>
                <h2>Edit Item Type</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Item Type Name</label>
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
                    title="Item Type Update"
                    description="Item item type updated successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
