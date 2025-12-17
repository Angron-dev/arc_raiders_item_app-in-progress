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
import ItemCanBeFoundIn from "@/Models/ItemCanBeFoundIn";
export default function FoundInList() {
    const [foundIn, setFoundIn] = useState<ItemCanBeFoundIn[]>([]);

    async function fetchFoundIn() {
        const response = await SiteApi.getAllFoundIn();
        setFoundIn(response);
    }

    useEffect(() => {
        fetchFoundIn()
    }, []);

    const columns = [
        { header: "Found In Name", key: "found_in_name" },
        {
            header: "",
            key: "actions",
            render: (row: ItemCanBeFoundIn) => (
                <>
                    <EditButton url={route("found_in.edit", row.id)} />
                    <DeleteButton url={route("api.found_in.delete", row.id)} onDeleted={fetchFoundIn} className="ml-2" />
                </>
            ),
        },
    ];


    return (
        <Header>
            <Container>
                <h1 className='text-center'>Found In List</h1>
                <div className="d-flex justify-content-end">
                    <CreateButton url={route('found_in.create')} name='Found In'/>
                </div>
                <DynamicTable
                    data={foundIn}
                    columns={columns}
                />
            </Container>
        </Header>
    )
}
