import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import RarityApi from "@/API/RarityApi";
import { router, usePage } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import ColorPickerField from "@/Components/ColorPicker";

interface RarityErrors {
    [key: string]: string[];
}
export default function RarityEdit() {
    const { rarityId } = usePage<{ rarityId: number }>().props;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [rarityErrors, setRarityErrors] = useState<RarityErrors>({});
    const [formData, setFormData] = useState({
        rarity_name: "",
        color: "#000000",
    });

    useEffect(() => {
        RarityApi.getRarityById(rarityId).then((data) => {
            setFormData(data);
            setLoading(false);
        });
    }, [rarityId]);

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
        setRarityErrors({});

        try {
            await RarityApi.updateRarity(rarityId, formData);
            setShowModal(true);
        } catch (error: any) {
            setRarityErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("rarity.list"));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Header>
            <Container>
                <h2>Edit Rarity</h2>

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
                    title="Rarity Update"
                    description="Item rarity updated successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
