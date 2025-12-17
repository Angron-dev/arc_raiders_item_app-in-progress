import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import TextInput from "@/Pages/components/Inputs/TextInput";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { route } from "ziggy-js";
import FoundInApi from "@/API/FoundInApi";

interface FoundInErrors {
    [key: string]: string[];
}

export default function FoundInCreate() {
    const [showModal, setShowModal] = useState(false);
    const [foundInErrors, setFoundInErrors] = useState<FoundInErrors>({});
    const [formData, setFormData] = useState({
        found_in_name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFoundInErrors({});

        try {
            await FoundInApi.createFoundIn(formData);
            setShowModal(true);
        } catch (error: any) {
            setFoundInErrors(error?.response?.data?.errors || {});
        }
    };

    const handleModalOk = () => {
        setShowModal(false);
        router.get(route("found_in.list"));
    };

    return (
        <Header>
            <Container>
                <h2>Create Found In</h2>

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
                    title="Found in Created"
                    description="Item found in created successfully"
                    onClick={handleModalOk}
                    infoModal={true}
                />
            </Container>
        </Header>
    );
}
