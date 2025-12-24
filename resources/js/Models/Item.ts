import ItemRarity from "./ItemRarity";
import ItemType from "./ItemType";
import LootArea from "./LootArea";

export default interface Item {
    id: number;
    item_name: string;
    item_type_name: string;
    rarity_id: number;
    price: number;
    icon: string;
    description: string;
    can_be_deconstruct: boolean;
    item_type_id: number;

    loot_areas?: LootArea[];
    item_type?: ItemType;
    rarity?: ItemRarity;
}
