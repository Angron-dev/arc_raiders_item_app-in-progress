import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import FoundInApi from "@/API/FoundInApi";

interface FoundInErrors {
    [key: string]: string[];
}
export default function FoundInEdit() {
    const { foundInId } = usePage<{ foundInId: number }>().props;

    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [foundInErrors, setFoundInErrors] = useState<FoundInErrors>({});
    const [formData, setFormData] = useState({
        found_in_name: "",
    });

    useEffect(() => {
        FoundInApi.getFoundInById(foundInId).then((data) => {
            console.log(data);
            setFormData(data);
            setLoading(false);
        });
    }, [foundInId]);

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
        setFoundInErrors({});

        try {
            await FoundInApi.updateFoundIn(foundInId, formData);
            setShowModal(true);
        } catch (error: any) {
            setFoundInErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("found_in.list"));
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Header>
            <Container>
                <h2>Edit Found In</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Found In Name</label>
                        <TextInput
                            name="found_in_name"
                            value={formData.found_in_name}
                            onChange={handleChange}
                        />
                        <span className="text-danger">
                            {foundInErrors["found_in_name"]?.[0]}
                        </span>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="Found In Update"
                    description="Item found in updated successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
