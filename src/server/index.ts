import { Hono } from "hono";
import { createDb, type DB } from "./db";

type Env = {
  Bindings: {
    DB: D1Database;
  };
  Variables: {
    db: DB;
  };
};

const app = new Hono<Env>();

app.use("*", async (c, next) => {
  c.set("db", createDb(c.env.DB));
  await next();
});

app.get("/api/health", (c) => {
  return c.json({
    status: "ok",
  });
});

export default app;