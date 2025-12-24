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
import LootArea from "@/Models/LootArea";
import Spinner from "@/Components/Spinner";
export default function LootAreaList() {
    const [lootArea, setLootArea] = useState<LootArea[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    async function fetchLootArea() {
        const response = await SiteApi.getAllLootAreas();
        await Promise.all(
            response.map((lootArea: LootArea) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = lootArea.symbol;
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                });
            })
        );

        setLootArea(response);
        setImagesLoaded(true);
    }

    useEffect(() => {
        fetchLootArea()
    }, []);

    const columns = [
        { header: "Symbol", key: "symbol", render: (row: LootArea) => <img className='mx-auto' src={row.symbol} alt={row.loot_area_name} loading="lazy" /> },
        { header: "Loot Area Name", key: "loot_area_name" },
        {
            header: "",
            key: "actions",
            render: (row: LootArea) => (
                <>
                    <EditButton url={route("loot_area.edit", row.id)} />
                    <DeleteButton url={route("api.loot_area.delete", row.id)} onDeleted={fetchLootArea} className="ml-2" />
                </>
            ),
        },
    ];


    return (
        <Header>
            <Container>
                <h1 className='text-center'>Loot Area List</h1>
                <div className="d-flex justify-content-end">
                    <CreateButton url={route('loot_area.create')} name='Loot Area'/>
                </div>

                {!imagesLoaded ? (
                    <Spinner />
                ) : (
                    <DynamicTable
                        data={lootArea}
                        columns={columns}
                    />
                )}
            </Container>
        </Header>
    );

}
