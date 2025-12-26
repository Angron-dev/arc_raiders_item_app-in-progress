import {route} from "ziggy-js";
import CurrencyAmount from "../../Components/CurrencyAmount";
import {Link} from "@inertiajs/react";
import Item from "../../Models/Item";

interface ItemCardProps {
    item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
    return (
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

            <CurrencyAmount value={item.price} className='justify-content-center'/>
        </Link>
    )
}

