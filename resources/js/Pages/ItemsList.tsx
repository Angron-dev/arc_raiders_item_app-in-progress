import Header from '../Layouts/Header';
import Container from './components/Container';
import {useEffect, useState} from "react";
import FiltersSection from "../Pages/components/FiltersSection";
import Pagination from "../Pages/components/Pagination";
import { useFilters, useItems } from "@/Hooks/useFilters";
import ViewButton from "@/Components/Buttons/ViewButton";
import EditButton from "@/Components/Buttons/EditButton";
import DeleteButton from "@/Components/Buttons/DeleteButton";
import {route} from "ziggy-js";
import Item from "@/Models/Item";
import DynamicTable from "@/Components/DynamicTable";

export default function ItemsList() {
    const { allRarity, allFoundIn, allItemTypes} = useFilters();
    const [filters, setFilters] = useState({
        rarity: '',
        foundIn: '',
        itemType: '',
        itemName: ''
    });
    const {
        items,
        currentPage,
        lastPage,
        fetchItems
    } = useItems(filters);


    useEffect(() => {
        fetchItems(1);
    }, []);

    useEffect(() => {
        fetchItems(1, filters);
    }, [filters]);

    const columns = [
        {
            header: "Icon",
            key: "icon",
            render: (row: Item) => (
                <img
                    src={row.icon}
                    alt={row.item_name}
                    className="mx-auto"
                    style={{ maxWidth: "75px" }}
                />
            ),
        },
        { header: "Name", key: "item_name" },
        { header: "Description", key: "description" },
        {
            header: "Rarity",
            key: "rarity",
            render: (row: Item) => (
                <span style={{ color: row.rarity?.color }}>
                {row.rarity?.rarity_name ?? "-"}
            </span>
            ),
        },
        {
            header: "Found In",
            key: "found_in",
            render: (row: Item) => row.found_in?.found_in_name ?? "-",
        },
        {
            header: "Type",
            key: "item_type",
            render: (row: Item) => row.item_type?.item_type_name ?? "-",
        },
        {
            header: "Price",
            key: "price",
            render: (row: Item) => (
                <span className="d-flex align-items-center justify-content-center">
                {row.price}
                    <img
                        src="images/currency_symbol.webp"
                        alt="Currency Symbol"
                        style={{ maxHeight: "20px" }}
                        className="ml-1"
                    />
            </span>
            ),
        },
        {
            header: "",
            key: "actions",
            render: (row: Item) => (
                <div className="d-flex flex-column align-items-center">
                    <ViewButton url={route("item.single", { id: row.id })} />
                    <EditButton url={route("item.edit", { id: row.id })} />
                    <DeleteButton
                        url={route("item.delete", { id: row.id })}
                        onDeleted={() => fetchItems(1, filters)}
                    />
                </div>
            ),
        },
    ];

    return (
        <Header header={undefined}>
            <Container>
                <h2 className='text-center mb-5'>Items List</h2>

                <FiltersSection
                    allRarity={allRarity}
                    allFoundIn={allFoundIn}
                    allItemTypes={allItemTypes}
                    filters={filters}
                    setFilters={setFilters}
                />

                <DynamicTable data={items} columns={columns} />

                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        fetchItems={fetchItems}
                    />
                </div>
            </Container>
        </Header>
    );
}
