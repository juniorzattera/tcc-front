import nookies from "nookies";

const TOKEN = "token";
const ONE_YEAR = 60 * 60 * 24 * 365;

export const tokenService = {
  setToken(token: string, ctx = null) {
    globalThis?.sessionStorage?.setItem(TOKEN, token);
    nookies.set(ctx, TOKEN, token, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },

  getToken(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[TOKEN] || null;
  },

  deleteToken(ctx = null) {
    nookies.destroy(ctx, TOKEN);
  },
};
