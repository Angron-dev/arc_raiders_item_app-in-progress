import { Link } from '@inertiajs/react';
import Container from "@/Pages/components/Container";
import FiltersSection from "@/Pages/components/FiltersSection";
import Pagination from "@/Pages/components/Pagination";
import {useEffect, useState} from "react";
import {useFilters, useItems} from "@/Hooks/useFilters";
import Header from "@/Layouts/Header";

export default function MainPage({ auth }: { auth: any }) {

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

    return (
        <Header>
            <Container>
                <h2 className='text-center mb-5'>Items List</h2>

                <FiltersSection
                    allRarity={allRarity}
                    allFoundIn={allFoundIn}
                    allItemTypes={allItemTypes}
                    filters={filters}
                    setFilters={setFilters}
                />
                <div className="d-grid"
                     style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}
                >
                    {items.map(item => {
                        return (
                            <Link href={`/items/${item.id}`} className="text-center border item-box">
                                <img src={item.icon} alt={item.item_name}  style={{ maxHeight: "100px" }} className='mx-auto'/>
                                <h5>{item.item_name}</h5>
                                <h6 className='rarity-box' style={{backgroundColor: item.rarity?.color}}>{item.rarity?.rarity_name}</h6>
                                <p className={'d-flex align-items-center justify-content-center'}>{item.price}<img src="images/currency_symbol.webp" alt="Currency Symbol" style={{ maxHeight: "20px" }} className='ml-1'/></p>
                            </Link>
                        )
                    })}
                </div>

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
