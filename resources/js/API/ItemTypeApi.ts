import AbstractApi from "@/API/AbstractApi";

class ItemTypeApi extends AbstractApi{
    static getItemTypeById(id: number) {
        return this.fetchData(`/item_type/${id}`);
    }
    static updateItemType(id: number, formData: Record<string, any>) {
        return this.putData(`/item_type/edit/${id}`, formData);
    }
    static createItemType(formData: Record<string, any>) {
        return this.postData(`/item_type/create`, formData);
    }
}
export default ItemTypeApi;
