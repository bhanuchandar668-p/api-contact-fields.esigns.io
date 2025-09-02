import type { Context } from "hono";
import { validateReq } from "../validations/validate-req.js";
import {
  getPaginatedRecordsConditionally,
  getRecordsConditionally,
  saveRecords,
  saveSingleRecord,
} from "../services/db/base-db-service.js";
import {
  custom_field_definitions,
  type CustomField,
} from "../db/schema/custom-field-definitions.js";
import type {
  ValidatedCustomFieldDef,
  ValidatedCustomFieldDefArr,
  ValidatedCustomFieldVal,
} from "../validations/schemas/vfields-schema.js";
import { sendResponse } from "../utils/resp-utils.js";
import {
  custom_field_values,
  type CustomFieldValue,
} from "../db/schema/custom-field-values.js";
import type { WhereQueryData } from "../types/db.types.js";
import {
  FIELD_ADDED,
  FIELDS_ADDED,
  FIELDS_DATA_SAVED,
  FIELDS_FETCHED,
} from "../constants/app-messages.js";
import BadRequestException from "../exceptions/bad-request-exception.js";
import { fetchAllFields } from "../services/db/fields-service.js";

export class FieldsController {
  addCustomFields = async (c: Context) => {
    try {
      const reqData = await c.req.json();

      const validated = await validateReq<ValidatedCustomFieldDefArr>(
        "fields-add",
        reqData,
        "Validation failed"
      );

      await saveRecords(custom_field_definitions, validated);

      return sendResponse(c, 201, FIELDS_ADDED);
    } catch (err) {
      throw err;
    }
  };

  getAllCustomFieldsByContactType = async (c: Context) => {
    try {
      const contactType = c.req.query("contact_type")!;

      if (!contactType) {
        throw new BadRequestException("Invalid contact type");
      }

      const whereQuery: WhereQueryData<CustomField> = {
        columns: ["contact_type"],
        values: [contactType],
      };

      const columnsToSelect = [
        "id",
        "contact_type",
        "field_key",
        "label",
        "field_type",
        "value"
      ];

      const fieldsResp = await getRecordsConditionally<CustomField>(
        custom_field_definitions,
        whereQuery,
        columnsToSelect
      );

      return sendResponse(c, 200, FIELDS_FETCHED, fieldsResp);
    } catch (err) {
      throw err;
    }
  };

  saveCustomFieldData = async (c: Context) => {
    try {
      const reqData = await c.req.json();

      const validatedData = await validateReq<ValidatedCustomFieldVal>(
        "fieldval-add",
        reqData,
        "Validation failed"
      );

      const resp = await saveSingleRecord<CustomFieldValue>(
        custom_field_values,
        {
          ...validatedData,
          field_key: validatedData.field_key ?? null,
        }
      );

      return sendResponse(c, 201, FIELDS_DATA_SAVED, resp);
    } catch (err) {
      throw err;
    }
  };

  getFieldsWithData = async (c: Context) => {
    try {
      const contactId = c.req.param("id")!;

      if (!contactId) {
        throw new BadRequestException("Invalid contact id");
      }

      const fieldsWithVal = await fetchAllFields(contactId);

      return sendResponse(c, 200, FIELDS_FETCHED, fieldsWithVal);
    } catch (err) {
      throw err;
    }
  };
}
