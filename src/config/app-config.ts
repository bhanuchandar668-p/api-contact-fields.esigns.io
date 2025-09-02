import envData from "../env.js";

export const appConfig = {
  port: Number(envData.PORT!),
  api_version: envData.API_VERSION!,
};
