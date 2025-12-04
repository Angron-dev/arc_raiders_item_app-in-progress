import axios from "axios";

export default abstract class AbstractApi {
    protected static apiPrefix: string = '/api';


    private static async request(method: 'get' | 'post' | 'put', url: string, data?: any, params?: any) {
        try {
            const response = await axios({
                method,
                url: `${this.apiPrefix}${url}`,
                data,
                params,
            });
            return response.data;
        } catch (error) {
            console.error(`Error during ${method.toUpperCase()} ${url}:`, error);
            throw error;
        }
    }
    static fetchData(url: string, params?: Record<string, any>) {
        return this.request('get', url, null, params);
    }

    static postData(url: string, data: Record<string, any>) {
        return this.request('post', url, data);
    }

    static putData(url: string, data: Record<string, any>) {
        return this.request('put', url, data);
    }
}
