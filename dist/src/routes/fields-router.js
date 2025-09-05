import { Hono } from "hono";
import { FieldsController } from "../controllers/fields-controller.js";
const fieldsRouter = new Hono();
const fieldsController = new FieldsController();
fieldsRouter.post("/", fieldsController.addFields);
fieldsRouter.get("/:id", fieldsController.getFieldsByResourceId);
export default fieldsRouter;
