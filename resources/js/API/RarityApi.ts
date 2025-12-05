import AbstractApi from "@/API/AbstractApi";
import ItemRarity from "@/Models/ItemRarity";

class RarityApi extends AbstractApi{
    static getRarityById(id: number) {
        return this.fetchData(`/rarity/${id}`);
    }
    static updateRarity(id: number, formData: Record<string, any>) {
        return this.putData(`/rarity/edit/${id}`, formData);
    }
    static createRarity(formData: Record<string, any>) {
        return this.postData(`/rarity/create`, formData);
    }
}
export default RarityApi;
