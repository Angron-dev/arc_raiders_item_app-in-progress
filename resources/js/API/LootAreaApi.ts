import AbstractApi from "@/API/AbstractApi";

class LootAreaApi extends AbstractApi{
    static getLootAreaById(id: number) {
        return this.fetchData(`/loot_area/${id}`);
    }
    static updateLootArea(id: number, formData: Record<string, any>) {
        return this.putData(`/loot_area/edit/${id}`, formData);
    }
    static createLootArea(formData: Record<string, any>) {
        return this.postData(`/loot_area/create`, formData);
    }
}
export default LootAreaApi;
