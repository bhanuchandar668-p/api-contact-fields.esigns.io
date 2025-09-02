import {
  any,
  array,
  object,
  optional,
  pipe,
  string,
  transform,
  type InferOutput,
} from "valibot";

export const VCustomFields = object({
  contact_type: pipe(
    string(),
    transform((val: string) => val.trim())
  ),
  field_key: string(),
  label: string(),
  field_type: string(),
  options: optional(any()),
});

export const VCustomFieldVal = object({
  contact_id: pipe(
    string(),
    transform((val: string) => val.trim())
  ),
  contact_type: pipe(
    string(),
    transform((val: string) => val.trim())
  ),
  field_key: string(),
  value: any(),
});

export const VCustomFieldsArray = array(VCustomFields);
export const VCustomFieldValArray = array(VCustomFieldVal);

export type ValidatedCustomFieldDef = InferOutput<typeof VCustomFields>;
export type ValidatedCustomFieldVal = InferOutput<typeof VCustomFieldVal>;
export type ValidatedCustomFieldDefArr = InferOutput<typeof VCustomFieldsArray>;
export type ValidatedCustomFieldValArr = InferOutput<
  typeof VCustomFieldValArray
>;
