import { flatten, safeParseAsync } from "valibot";
import UnprocessableContentException from "../exceptions/unprocessable-content-exception.js";
import { VCustomFields, VCustomFieldsArray, VCustomFieldVal, VCustomFieldValArray, } from "./schemas/vfields-schema.js";
export async function validateReq(actionType, reqData, errMsg) {
    let schema;
    switch (actionType) {
        case "field-add":
            schema = VCustomFields;
            break;
        case "fields-add":
            schema = VCustomFieldsArray;
            break;
        case "field-update":
            schema = VCustomFields;
            break;
        case "fieldvals-add":
            schema = VCustomFieldValArray;
            break;
        default:
    }
    const validResp = await safeParseAsync(schema, reqData, {
        abortEarly: true,
    });
    if (!validResp.success) {
        const errData = flatten(validResp.issues).nested;
        throw new UnprocessableContentException(errMsg, errData);
    }
    return validResp.output;
}
