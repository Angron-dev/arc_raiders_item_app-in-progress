import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import {usePage} from "@inertiajs/react";
import ItemApi from "@/API/ItemApi";
import {useEffect, useState} from "react";
import Item from "@/Models/Item";
import Spinner from "@/Components/Spinner";
import LootArea from "@/Models/LootArea";

export default function SingleItem() {
    const { itemId } = usePage<{ itemId: number }>().props;
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            const data = await ItemApi.getItemById(itemId);
            setItem(data);
        };

        fetchItem();
    }, [itemId]);

    if (!item) return (
        <Header>
            <Spinner/>
        </Header>
    );

    return (
        <Header>
            <Container>
                <h1>{item.item_name}</h1>
                <p>Type: {item?.item_type?.item_type_name ?? '-'}</p>
                <p>Rarity: {item.rarity?.rarity_name ?? '-'}</p>
                <p>
                    Loot Area:{" "}
                    {item.loot_areas && item.loot_areas.length > 0 ? (
                        item.loot_areas.map((loot_area: LootArea) => (
                            <div key={loot_area.id} className="d-flex align-items-center">
                                <img
                                    src={loot_area.symbol}
                                    alt={loot_area.loot_area_name}
                                    style={{ height: 30, marginRight: 4 }}
                                />
                                <span>{loot_area.loot_area_name}</span>
                            </div>

                        ))
                    ) : (
                        "-"
                    )}
                </p>
                <p>Price: {item.price}</p>
            </Container>
        </Header>
    );
}
