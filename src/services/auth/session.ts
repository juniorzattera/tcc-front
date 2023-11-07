import { JwtPayload } from "jwt-decode";
import { authService } from "./authService";
import { useState, useEffect } from "react";

export function useSession() {
  const [session, setSession] = useState<string | null | JwtPayload>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSession = async () => {
    try {
      const session = await authService.getSession();
      setSession(session);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return { data: session, loading, error };
}
export function withSession(func: any) {
  return async (ctx: any) => {
    try {
      const session = await authService.getSession(ctx);

      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return func(modifiedCtx);
    } catch (error) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  };
}
