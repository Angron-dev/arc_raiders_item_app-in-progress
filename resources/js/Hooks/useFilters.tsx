import { useState, useEffect } from "react";
import SiteApi from "@/API/SiteApi";
import Filters from "@/Models/Filters";
import Item from "@/Models/Item";
import ItemApi from "@/API/ItemApi";
import ItemRarity from "@/Models/ItemRarity";
import ItemCanBeFoundIn from "@/Models/ItemCanBeFoundIn";
import ItemType from "@/Models/ItemType";

export function useFilters() {
    const [allRarity, setAllRarity] = useState<ItemRarity[]>([]);
    const [allFoundIn, setAllFoundIn] = useState<ItemCanBeFoundIn[]>([]);
    const [allItemTypes, setAllItemTypes] = useState<ItemType[]>([]);
    const [loading, setLoading] = useState(true);

    const loadFilters = async () => {
        try {
            const [rarity, foundIn, itemTypes] = await Promise.all([
                SiteApi.getAllRarity(),
                SiteApi.getAllFoundIn(),
                SiteApi.getAllItemTypes()
            ]);

            setAllRarity(rarity);
            setAllFoundIn(foundIn);
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
        allFoundIn,
        allItemTypes,
        loading
    };
}
export function useItems(initialFilters: Filters = {
    itemName: "",
    rarity: "",
    foundIn: "",
    itemType: ""
}) {
    const [items, setItems] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchItems = async (page = 1, filters: Filters = {
        itemName: "",
        rarity: "",
        foundIn: "",
        itemType: ""
    }) => {
        const params: Record<string, any>  = {
            page,
            ...(filters.rarity && { rarity_id: filters.rarity }),
            ...(filters.foundIn && { found_in_id: filters.foundIn }),
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
