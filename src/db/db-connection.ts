import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import fs from "node:fs";

import * as custom_field_definitions from "./schema/custom-field-definitions.js";

import * as custom_field_values from "./schema/custom-field-values.js";
import { dbConfig } from "../config/db-config.js";

const { Pool } = pg;

const dbClient = new Pool({
  host: dbConfig.host!,
  port: Number(dbConfig.port!),
  user: dbConfig.user!,
  password: dbConfig.password!,
  database: dbConfig.database!,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(`${process.cwd()}/ca.pem`).toString(),
  },
});

const db = drizzle(dbClient, {
  schema: {
    ...custom_field_definitions,
    ...custom_field_values,
  },
});

export default db;
