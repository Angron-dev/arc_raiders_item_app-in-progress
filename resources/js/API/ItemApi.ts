
import AbstractApi from "@/API/AbstractApi";
import SiteApi from "@/API/SiteApi";

class ItemApi extends AbstractApi{
    static getAllItems(params: Record<string, any> ) {
        return this.fetchData('/items', params);
    }

    static getItemById(id: number) {
        return this.fetchData(`/item/${id}`);
    }

    static createItem(formData: Record<string, any>) {
        return this.postData('/item', formData);
    }

    static updateItem(id: number, formData: Record<string, any>) {
        return this.putData(`/item/${id}`, formData);
    }

    static getDeconstructComponents(id: number) {
        return this.fetchData(`/item/deconstruct_components/${id}`);
    }
    static manageDeconstructComponent(id: number, data:{
        components: {
            result_item_id: number;
            amount: number;
        }[];
    }) {
        return this.postData(`/item/${id}/deconstruct_components`, data);
    }

}
export default ItemApi;
