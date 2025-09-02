import { validateReq } from "../validations/validate-req.js";
import { getPaginatedRecordsConditionally, getRecordsConditionally, saveRecords, saveSingleRecord, } from "../services/db/base-db-service.js";
import { custom_field_definitions, } from "../db/schema/custom-field-definitions.js";
import { sendResponse } from "../utils/resp-utils.js";
import { custom_field_values, } from "../db/schema/custom-field-values.js";
import { FIELD_ADDED, FIELDS_ADDED, FIELDS_DATA_SAVED, FIELDS_FETCHED, } from "../constants/app-messages.js";
import BadRequestException from "../exceptions/bad-request-exception.js";
import { fetchAllFields } from "../services/db/fields-service.js";
export class FieldsController {
    addCustomFields = async (c) => {
        try {
            const reqData = await c.req.json();
            const validated = await validateReq("fields-add", reqData, "Validation failed");
            await saveRecords(custom_field_definitions, validated);
            return sendResponse(c, 201, FIELDS_ADDED);
        }
        catch (err) {
            throw err;
        }
    };
    getAllCustomFieldsByContactType = async (c) => {
        try {
            const contactType = c.req.query("contact_type");
            if (!contactType) {
                throw new BadRequestException("Invalid contact type");
            }
            const whereQuery = {
                columns: ["contact_type"],
                values: [contactType],
            };
            const columnsToSelect = [
                "id",
                "contact_type",
                "field_key",
                "label",
                "field_type",
            ];
            const fieldsResp = await getRecordsConditionally(custom_field_definitions, whereQuery, columnsToSelect);
            return sendResponse(c, 200, FIELDS_FETCHED, fieldsResp);
        }
        catch (err) {
            throw err;
        }
    };
    saveCustomFieldData = async (c) => {
        try {
            const reqData = await c.req.json();
            const validatedData = await validateReq("fieldval-add", reqData, "Validation failed");
            const resp = await saveSingleRecord(custom_field_values, {
                ...validatedData,
                field_key: validatedData.field_key ?? null,
            });
            return sendResponse(c, 201, FIELDS_DATA_SAVED, resp);
        }
        catch (err) {
            throw err;
        }
    };
    getFieldsWithData = async (c) => {
        try {
            const contactId = c.req.param("id");
            if (!contactId) {
                throw new BadRequestException("Invalid contact id");
            }
            const fieldsWithVal = await fetchAllFields(contactId);
            return sendResponse(c, 200, FIELDS_FETCHED, fieldsWithVal);
        }
        catch (err) {
            throw err;
        }
    };
}
