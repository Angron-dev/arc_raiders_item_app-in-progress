import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import SiteApi from "@/API/SiteApi";
import {useEffect, useState} from "react";
import ItemRarity from "@/Models/ItemRarity";
import EditButton from "@/Components/Buttons/EditButton";
import {route} from "ziggy-js";
import DeleteButton from "@/Components/Buttons/DeleteButton";
import CreateButton from "@/Components/Buttons/CreateButton";
import DynamicTable from "@/Components/DynamicTable";
export default function RarityList() {
    const [rarity, setRarity] = useState<ItemRarity[]>([]);

    async function fetchRarity() {
        const response = await SiteApi.getAllRarity();
        setRarity(response);
    }

    useEffect(() => {
        fetchRarity()
    }, []);

    const columns = [
        { header: "Rarity Name", key: "rarity_name" },
        {
            header: "Color",
            key: "color",
            render: (row: ItemRarity) => (
                <span className="rarity-box" style={{ background: row.color }}>
                    {row.color}
                </span>
            ),
        },
        {
            header: "",
            key: "actions",
            render: (row: ItemRarity) => (
                <>
                    <EditButton url={route("rarity.edit", row.id)} />
                    <DeleteButton url={route("api.rarity.delete", row.id)} onDeleted={fetchRarity} className="ml-2" />
                </>
            ),
        },
    ];


    return (
        <Header>
            <Container>
                <h1 className='text-center'>Rarity List</h1>
                <div className="d-flex justify-content-end">
                    <CreateButton url={route('rarity.create')} name='Rarity'/>
                </div>
                <DynamicTable
                    data={rarity}
                    columns={columns}
                />
            </Container>
        </Header>
    )
}
