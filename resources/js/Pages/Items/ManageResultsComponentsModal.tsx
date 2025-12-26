import { useEffect, useMemo, useState } from "react";
import Item from "@/Models/Item";
import ItemApi from "@/API/ItemApi";

type SelectedItem = {
    item: Item;
    amount: number;
};

interface ManageResultsComponentsModalProps {
    itemId: number;
    onSave?: () => void;
    deconstructComponents: Item[];
}

export default function ManageResultsComponentsModal({
     itemId,
     onSave,
     deconstructComponents,
 }: ManageResultsComponentsModalProps) {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
    const [initialItems, setInitialItems] = useState<SelectedItem[]>([]);
    const [isSaving, setIsSaving] = useState(false);


    const existingComponentIds = useMemo(
        () => new Set(deconstructComponents.map(i => i.id)),
        [deconstructComponents]
    );


    useEffect(() => {
        if (!showModal) return;

            console.log(deconstructComponents)
        const mapped = deconstructComponents.map(item => ({
            item,
            amount: item.pivot?.amount ?? 1,
        }));

        setSelectedItems(mapped);
        setInitialItems(mapped);
    }, [showModal, deconstructComponents]);


    useEffect(() => {
        if (!searchTerm) {
            setSearchResults([]);
            return;
        }

        const fetch = async () => {
            const response = await ItemApi.getAllItems({ item_name: searchTerm });
            setSearchResults(response.data ?? []);
        };

        fetch();
    }, [searchTerm]);

    const addItem = (item: Item) => {
        setSelectedItems(prev => {
            if (prev.some(i => i.item.id === item.id)) return prev;
            return [...prev, { item, amount: 1 }];
        });

        setSearchTerm("");
        setSearchResults([]);
    };

    const removeItem = (id: number) => {
        setSelectedItems(prev => prev.filter(i => i.item.id !== id));
    };

    const changeAmount = (id: number, amount: number) => {
        setSelectedItems(prev =>
            prev.map(i =>
                i.item.id === id
                    ? { ...i, amount: Math.max(1, amount) }
                    : i
            )
        );
    };

    const closeModal = () => {
        setSelectedItems(initialItems);
        setSearchResults([]);
        setSearchTerm("");
        setShowModal(false);
    };

    const handleSave = async () => {

        setIsSaving(true);
        try {
            await ItemApi.manageDeconstructComponent(itemId, {
                components: selectedItems.map(i => ({
                    result_item_id: i.item.id,
                    amount: i.amount
                }))
            });

            setShowModal(false);
            onSave?.();
        } catch (e) {
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <button
                className="btn btn-primary mb-2 ms-auto d-block"
                onClick={() => setShowModal(true)}
            >
                Manage Result Items
            </button>

            {showModal && (
                <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Deconstruction Results</h5>
                                <button className="btn-close" onClick={closeModal} />
                            </div>

                            <div className="modal-body">
                                <input
                                    className="form-control mb-2"
                                    placeholder="Search item..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />

                                {searchResults.length > 0 && (
                                    <ul className="list-group mb-3">
                                        {searchResults.map(item => {
                                            const alreadyExists = existingComponentIds.has(item.id);

                                            return (
                                                <li
                                                    key={item.id}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                >
                                                    <span>{item.item_name}</span>

                                                    {!alreadyExists && (
                                                        <button
                                                            className="btn btn-sm btn-success"
                                                            onClick={() => addItem(item)}
                                                        >
                                                            + Add
                                                        </button>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}

                                {selectedItems.length > 0 && (
                                    <>
                                        <h6>Selected items</h6>
                                        <ul className="list-group">
                                            {selectedItems.map(({ item, amount }) => (
                                                <li
                                                    key={item.id}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                >
                                                    <span>{item.item_name}</span>

                                                    <div className="d-flex gap-2 align-items-center">
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            className="form-control form-control-sm"
                                                            style={{ width: 80 }}
                                                            value={amount}
                                                            onChange={e =>
                                                                changeAmount(
                                                                    item.id,
                                                                    Number(e.target.value)
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeItem(item.id)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
