import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import LootAreaApi from "@/API/LootAreaApi";

interface LootAreaErrors {
    [key: string]: string[];
}

export default function LootAreaCreate() {
    const [showModal, setShowModal] = useState(false);
    const [lootAreaErrors, setLootAreaErrors] = useState<LootAreaErrors>({});
    const [formData, setFormData] = useState({
        loot_area_name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLootAreaErrors({});

        try {
            await LootAreaApi.createLootArea(formData);
            setShowModal(true);
        } catch (error: any) {
            setLootAreaErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("loot_area.list"));
    };

    return (
        <Header>
            <Container>
                <h2>Create Loot Area</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Loot Area name</label>
                        <TextInput
                            name="loot_area_name"
                            value={formData.loot_area_name}
                            onChange={handleChange}
                        />
                        <span className="text-danger">
                            {lootAreaErrors["loot_area_name"]?.[0]}
                        </span>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="Loot Area"
                    description="Loot area created successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
