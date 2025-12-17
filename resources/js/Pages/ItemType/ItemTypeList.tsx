import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import SiteApi from "@/API/SiteApi";
import {useEffect, useState} from "react";
import EditButton from "@/Components/Buttons/EditButton";
import {route} from "ziggy-js";
import DeleteButton from "@/Components/Buttons/DeleteButton";
import CreateButton from "@/Components/Buttons/CreateButton";
import DynamicTable from "@/Components/DynamicTable";
import ItemType from "@/Models/ItemType";
export default function ItemTypeList() {
    const [item_type, setItemType] = useState<ItemType[]>([]);

    async function fetchItemType() {
        const response = await SiteApi.getAllItemTypes();
        setItemType(response);
    }

    useEffect(() => {
        fetchItemType()
    }, []);

    const columns = [
        { header: "Item Type Name", key: "item_type_name" },
        {
            header: "",
            key: "actions",
            render: (row: ItemType) => (
                <>
                    <EditButton url={route("item_type.edit", row.id)} />
                    <DeleteButton url={route("api.item_type.delete", row.id)} onDeleted={fetchItemType} className="ml-2" />
                </>
            ),
        },
    ];


    return (
        <Header>
            <Container>
                <h1 className='text-center'>Item Type List</h1>
                <div className="d-flex justify-content-end">
                    <CreateButton url={route('item_type.create')} name='Item Type'/>
                </div>
                <DynamicTable
                    data={item_type}
                    columns={columns}
                />
            </Container>
        </Header>
    )
}
