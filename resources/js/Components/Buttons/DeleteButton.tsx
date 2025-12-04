import { router } from '@inertiajs/react'
import { useState } from 'react'
import Modal from "@/Components/Modal";

interface DeleteButtonProps {
    url: string;
    onDeleted?: () => void;
}

export default function DeleteButton({ url, onDeleted }: DeleteButtonProps) {
    const [showModal, setShowModal] = useState(false);

    const handleOpen = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {

        router.delete(url, {
            onSuccess: () => {
                setShowModal(false);
                if (onDeleted) {
                    onDeleted();
                }
            },
        });
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                className="btn btn-danger btn-sm mb-2"
                onClick={handleOpen}
            >
                Delete
            </button>

            <Modal show={showModal} onClose={handleClose} onClick={handleConfirmDelete} title="Delete" description="Are you absolutely sure you want to remove this item permanently?">
            </Modal>
        </>
    );
}
