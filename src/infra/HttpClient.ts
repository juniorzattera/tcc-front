import { AxiosAdapter } from "./AxiosAdapter";
import { API_URL} from './constants';
export class HttpClient {
    constructor(private readonly adapter = new AxiosAdapter(API_URL)) {}

    async get(url: string): Promise<any> {
        return await this.adapter.get(url);
    }

    async post(url: string, body: any): Promise<any> {
        return await this.adapter.post(url, body);
    }

    async put(url: string, body: any): Promise<any> {
        return await this.adapter.put(url, body);
    }

    async delete(url: string): Promise<any> {
        return await this.adapter.delete(url);
    }
}