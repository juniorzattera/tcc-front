import { tokenService } from "./tokenService";
import { HttpClient } from "@/infra/HttpClient";
import { JwtPayload, jwtDecode } from "jwt-decode";

type LoginProps = {
  username: string;
  password: string;
};

const httpClient = new HttpClient();

export const authService = {
  async login({ username, password }: LoginProps) {
    const response = await httpClient.post("/auth/login", {
      username,
      password,
    });

    if (!response.access_token)
      throw new Error("Não foi possível fazer o login agora :(");
    tokenService.setToken(response.access_token);
    return response.access_token;
  },

  async getSession(ctx = null) {
    const token = tokenService.getToken(ctx);
    if (!token) throw new Error("Não foi possível obter a sessão");
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp < Date.now() / 1000
    ) {
      throw new Error("Sessão expirada");
    }
    return decodedToken;
  },
};
