import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useState } from "react";
import RarityApi from "@/API/RarityApi";
import { router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import ColorPickerField from "@/Components/ColorPicker";

interface RarityErrors {
    [key: string]: string[];
}

export default function RarityCreate() {
    const [showModal, setShowModal] = useState(false);
    const [rarityErrors, setRarityErrors] = useState<RarityErrors>({});
    const [formData, setFormData] = useState({
        rarity_name: "",
        color: "#000000",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRarityErrors({});

        try {
            await RarityApi.createRarity(formData);
            setShowModal(true);
        } catch (error: any) {
            setRarityErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("rarity.list"));
    };

    return (
        <Header>
            <Container>
                <h2>Create Rarity</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Rarity Name</label>
                        <TextInput
                            name="rarity_name"
                            value={formData.rarity_name}
                            onChange={handleChange}
                        />
                        <span className="text-danger">
                            {rarityErrors["rarity_name"]?.[0]}
                        </span>
                    </div>

                    <ColorPickerField
                        value={formData.color}
                        onChange={(value) =>
                            setFormData(prev => ({ ...prev, color: value }))
                        }
                        error={rarityErrors["color"]?.[0]}
                    />

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="Rarity Created"
                    description="Item rarity created successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
