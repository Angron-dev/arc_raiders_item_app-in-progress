import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import LootAreaApi from "@/API/LootAreaApi";

interface LootAreaErrors {
    [key: string]: string[];
}
export default function LootAreaEdit() {
    const { lootAreaId } = usePage<{ lootAreaId: number }>().props;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [lootAreaErrors, setLootAreaErrors] = useState<LootAreaErrors>({});
    const [formData, setFormData] = useState({
        loot_area_name: "",
    });

    useEffect(() => {
        LootAreaApi.getLootAreaById(lootAreaId).then((data) => {
            setFormData(data);
            setLoading(false);
        });
    }, [lootAreaId]);

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
        setLootAreaErrors({});

        try {
            await LootAreaApi.updateLootArea(lootAreaId, formData);
            setShowModal(true);
        } catch (error: any) {
            setLootAreaErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("loot_area.list"));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Header>
            <Container>
                <h2>Edit Loot Area</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Loot Area Name</label>
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
                    title="Loot Area Update"
                    description="Loot area in updated successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
