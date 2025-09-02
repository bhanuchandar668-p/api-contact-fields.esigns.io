import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { appConfig } from "./config/app-config.js";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { notFoundResp, sendResponse } from "./utils/resp-utils.js";
import { DEF_ERROR_RESP, DEF_SERVICE_RUNNING, DEF_STATUS_CODE, } from "./constants/app-messages.js";
import fieldsRouter from "./routes/fields-router.js";
const apiVer = appConfig.api_version;
const app = new Hono().basePath(`/v${apiVer}`);
app.use("/*", cors());
app.use(logger());
// Health-Check
app.get("/", (c) => {
    return sendResponse(c, 200, DEF_SERVICE_RUNNING);
});
// App-Routes
app.route("/fields", fieldsRouter);
app.onError((err, c) => {
    c.status(err.status || DEF_STATUS_CODE);
    console.error(err);
    const errResp = {
        success: false,
        status_code: err.status || DEF_STATUS_CODE,
        message: err?.message || DEF_ERROR_RESP,
        err_data: err.errData || undefined,
        err_code: err.errCode || undefined,
        timestamp: new Date().toISOString(),
    };
    return c.json(errResp);
});
app.notFound(notFoundResp);
const port = appConfig.port;
serve({
    fetch: app.fetch,
    port,
}, (info) => {
    console.log(`Server is running on ${info.port}`);
});
