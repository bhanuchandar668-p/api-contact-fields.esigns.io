import { any, array, object, optional, pipe, string, transform, } from "valibot";
export const VCustomFields = object({
    contact_type: pipe(string(), transform((val) => val.trim())),
    field_key: string(),
    label: string(),
    field_type: string(),
    options: optional(any()),
});
export const VCustomFieldVal = object({
    contact_id: pipe(string(), transform((val) => val.trim())),
    contact_type: pipe(string(), transform((val) => val.trim())),
    field_key: string(),
    value: any(),
});
export const VCustomFieldsArray = array(VCustomFields);
export const VCustomFieldValArray = array(VCustomFieldVal);
