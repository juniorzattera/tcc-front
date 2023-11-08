import axios, { Axios } from "axios";
import { IApiAdapter } from "./interfacesAdapterApi";
import { tokenService } from "@/services/auth/tokenService";

export class AxiosAdapter implements IApiAdapter {
  private readonly axios: Axios;
  private readonly tokenService = tokenService;

  constructor(private readonly baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    });
  }

  async get(url: string): Promise<any> {
    const response = await this.axios.get(url);
    return response.data;
  }

  async post(url: string, body: any): Promise<any> {
    const response = await this.axios.post(url, body);
    return response.data;
  }

  async put(url: string, body: any): Promise<any> {
    const response = await this.axios.put(url, body);
    return response.data;
  }

  async delete(url: string): Promise<any> {
    const response = await this.axios.delete(url);
    return response.data;
  }
}
