import Header from "@/Layouts/Header";
import Container from "@/Pages/components/Container";
import {usePage} from "@inertiajs/react";
import ItemApi from "@/API/ItemApi";
import {useEffect, useState} from "react";
import Item from "@/Models/Item";

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
            <Container>Loading item...</Container>
        </Header>
    );

    return (
        <Header>
            <Container>
                <h1>{item.item_name}</h1>
                <p>Type: {item?.item_type?.item_type_name ?? '-'}</p>
                <p>Rarity: {item.rarity?.rarity_name ?? '-'}</p>
                <p>Found In: {item.found_in?.found_in_name ?? '-'}</p>
                <p>Price: {item.price}</p>
            </Container>
        </Header>
    );
}
