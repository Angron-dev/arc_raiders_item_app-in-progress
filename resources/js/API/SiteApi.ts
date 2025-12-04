import AbstractApi from "@/API/AbstractApi";

class SiteApi extends AbstractApi{

    static getAllRarity() {
        return this.fetchData('/item_rarity');
    }

    static getAllFoundIn() {
        return this.fetchData('/found_in');
    }
    static getAllItemTypes() {
        return this.fetchData('/item_types');
    }
}

export default SiteApi;
