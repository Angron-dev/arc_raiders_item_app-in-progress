import AbstractApi from "@/API/AbstractApi";

class FoundInApi extends AbstractApi{
    static getFoundInById(id: number) {
        return this.fetchData(`/found_in/${id}`);
    }
    static updateFoundIn(id: number, formData: Record<string, any>) {
        return this.putData(`/found_in/edit/${id}`, formData);
    }
    static createFoundIn(formData: Record<string, any>) {
        return this.postData(`/found_in/create`, formData);
    }
}
export default FoundInApi;
