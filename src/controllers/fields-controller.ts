import type { Context } from "hono";
import { validateReq } from "../validations/validate-req.js";

import { sendResponse } from "../utils/resp-utils.js";
import {
  getRecordsConditionally,
  saveRecords,
} from "../services/db/base-db-service.js";
import {
  contact_fields,
  type ContactField,
} from "../db/schema/contact-fields.js";
import type { WhereQueryData } from "../types/db.types.js";
import { makeSlug } from "../utils/app-utils.js";

export class FieldsController {
  addFields = async (c: Context) => {
    try {
      const reqData = await c.req.json();

      const fields = reqData.fields;

      for (const field of fields) {
        field.field_key = makeSlug(field.label);
      }

      await saveRecords<ContactField>(contact_fields, fields);

      return sendResponse(c, 201, "Fields added successfully");
    } catch (err) {
      throw err;
    }
  };

  getFieldsByResourceId = async (c: Context) => {
    try {
      const resourceId = c.req.param("id");

      const columnsToSelect = [
        "id",
        "resource_id",
        "field_type",
        "field_key",
        "label",
        "value",
      ];

      const whereQuery: WhereQueryData<ContactField> = {
        columns: ["resource_id"],
        values: [resourceId],
      };

      const respData = await getRecordsConditionally<ContactField>(
        contact_fields,
        whereQuery,
        columnsToSelect
      );

      return sendResponse(c, 200, "Fields fetched successfully", respData);
    } catch (err) {
      throw err;
    }
  };
}
