import { cwd } from "node:process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

export default {
  schema: "./configs/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};
