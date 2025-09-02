import { Hono } from "hono";
import { FieldsController } from "../controllers/fields-controller.js";

const fieldsRouter = new Hono();

const fieldsController = new FieldsController();

fieldsRouter.post("/", fieldsController.addCustomFields);
fieldsRouter.get("/", fieldsController.getAllCustomFieldsByContactType);
fieldsRouter.get("/:id", fieldsController.getFieldsWithData);

export default fieldsRouter;
