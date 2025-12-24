import AbstractApi from "@/API/AbstractApi";

class SiteApi extends AbstractApi{

    static getAllRarity() {
        return this.fetchData('/item_rarity');
    }

    static getAllLootAreas() {
        return this.fetchData('/loot_areas');
    }
    static getAllItemTypes() {
        return this.fetchData('/item_types');
    }
}

export default SiteApi;
