import { useState, useEffect } from "react";
import SiteApi from "@/API/SiteApi";
import Filters from "@/Models/Filters";
import Item from "@/Models/Item";
import ItemApi from "@/API/ItemApi";
import ItemRarity from "@/Models/ItemRarity";
import LootArea from "@/Models/LootArea";
import ItemType from "@/Models/ItemType";

export function useFilters() {
    const [allRarity, setAllRarity] = useState<ItemRarity[]>([]);
    const [allLootArea, setAllLootArea] = useState<LootArea[]>([]);
    const [allItemTypes, setAllItemTypes] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFilters = async () => {
        try {
            const [rarity, lootArea, itemTypes] = await Promise.all([
                SiteApi.getAllRarity(),
                SiteApi.getAllLootAreas(),
                SiteApi.getAllItemTypes()
            ]);

            setAllRarity(rarity);
            setAllLootArea(lootArea);
            setAllItemTypes(itemTypes);
        } catch (error) {
            console.error("Error loading filters", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFilters();
    }, []);

    return {
        allRarity,
        allLootArea,
        allItemTypes,
        loading
    };
}
export function useItems(initialFilters: Filters = {
    itemName: "",
    rarity: "",
    lootArea: "",
    itemType: ""
}) {
    const [items, setItems] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchItems = async (page = 1, filters: Filters = {
        itemName: "",
        rarity: "",
        lootArea: "",
        itemType: ""
    }) => {
        const params: Record<string, any>  = {
            page,
            ...(filters.rarity && { rarity_id: filters.rarity }),
            ...(filters.lootArea && { loot_area_id: filters.lootArea }),
            ...(filters.itemType && { item_type_id: filters.itemType }),
            ...(filters.itemName && { item_name: filters.itemName }),
        };

        try {
            setLoading(true);

            ItemApi.getAllItems(params).then(
                (response) => {
                    setItems(response.data);
                    setCurrentPage(response.current_page);
                    setLastPage(response.last_page);
                }
            )

        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(1, initialFilters);
    }, []);

    return {
        items,
        currentPage,
        lastPage,
        loading,
        fetchItems,
    };
}
