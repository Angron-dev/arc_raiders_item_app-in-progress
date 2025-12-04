
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
        return this.postData('/item/create', formData);
    }

    static updateItem(id: number, formData: Record<string, any>) {
        return this.putData(`/item/edit/${id}`, formData);
    }

}
export default ItemApi;
