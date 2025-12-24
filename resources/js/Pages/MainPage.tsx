import { Link } from '@inertiajs/react';
import Container from "@/Pages/components/Container";
import FiltersSection from "@/Pages/components/FiltersSection";
import Pagination from "@/Pages/components/Pagination";
import { useEffect, useState } from "react";
import { useFilters, useItems } from "@/Hooks/useFilters";
import Header from "@/Layouts/Header";
import { route } from "ziggy-js";
import CurrencyAmount from "@/Components/CurrencyAmount";
import { preloadImages } from "@/Utils/imagePreloader";
import Spinner from "@/Components/Spinner";

export default function MainPage({ auth }: { auth: any }) {

    const { allRarity, allLootArea, allItemTypes } = useFilters();

    const [filters, setFilters] = useState({
        rarity: '',
        lootArea: '',
        itemType: '',
        itemName: ''
    });

    const {
        items,
        currentPage,
        lastPage,
        fetchItems
    } = useItems(filters);

    const [dataLoading, setDataLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setDataLoading(true);
            await fetchItems(1, filters);
            setDataLoading(false);
        })();
    }, [filters]);

    useEffect(() => {
        if (!items.length) return;

        const imageUrls: string[] = [
            "/images/currency_symbol.webp",
            ...items.map(item => item.icon),
        ];

        items.forEach(item => {
            item.loot_areas?.forEach((lootArea: any) => {
                if (lootArea.symbol) {
                    imageUrls.push(lootArea.symbol);
                }
            });
        });

        setImagesLoading(true);
        preloadImages(imageUrls).then(() => setImagesLoading(false));
    }, [items]);

    const isLoading = dataLoading || imagesLoading;

    return (
        <Header>
            <Container>

                {isLoading ? (
                    <Spinner/>
                ) : (
                    <>
                        <h2 className='text-center mb-5'>Items List</h2>

                        <FiltersSection
                            allRarity={allRarity}
                            allLootAreas={allLootArea}
                            allItemTypes={allItemTypes}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <div
                            className="d-grid"
                            style={{
                                gridTemplateColumns: "repeat(3, 1fr)",
                                gap: "1rem"
                            }}
                        >
                            {items.map(item => (
                                <Link
                                    key={item.id}
                                    href={route('item.single', item.id)}
                                    className="text-center border item-box py-3"
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.item_name}
                                        style={{ maxHeight: "100px" }}
                                        className="mx-auto"
                                    />

                                    <h5>{item.item_name}</h5>

                                    <h6
                                        className='rarity-box'
                                        style={{ backgroundColor: item.rarity?.color }}
                                    >
                                        {item.rarity?.rarity_name}
                                    </h6>

                                    <span className="d-flex justify-content-center align-items-center">
                                        {item.loot_areas && item.loot_areas.length > 0 ? (
                                            item.loot_areas.map((lootArea: any) => (
                                                <img
                                                    key={lootArea.id}
                                                    src={lootArea.symbol}
                                                    alt={lootArea.loot_area_name}
                                                    style={{ marginRight: 4, height: "40px" }}
                                                />
                                            ))
                                        ) : (
                                            <div className="rarity-box-empty">-</div>
                                        )}
                                    </span>

                                    <CurrencyAmount value={item.price} />
                                </Link>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            <Pagination
                                currentPage={currentPage}
                                lastPage={lastPage}
                                fetchItems={fetchItems}
                            />
                        </div>
                    </>
                )}

            </Container>
        </Header>
    );
}
