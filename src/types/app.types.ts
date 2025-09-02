import type {
  ValidatedCustomFieldDef,
  ValidatedCustomFieldDefArr,
  ValidatedCustomFieldVal,
  ValidatedCustomFieldValArr,
} from "../validations/schemas/vfields-schema.js";

export interface SuccessResp {
  success: boolean;
  status_code: number;
  message: string;
  data?: any;
}

export interface AppResp {
  [key: string]: any;
}

export type FieldDefActivity =
  | "field-add"
  | "field-update"
  | "field-delete"
  | "fields-add";

export type FieldValActivity =
  | "fieldval-add"
  | "fieldval-update"
  | "fieldvals-add";

export type AppActivity = FieldDefActivity | FieldValActivity;

export type ValidatedReq =
  | ValidatedCustomFieldDef
  | ValidatedCustomFieldVal
  | ValidatedCustomFieldDefArr
  | ValidatedCustomFieldValArr;
