import { eq } from "drizzle-orm";
import db from "../../db/db-connection.js";
import { custom_field_values } from "../../db/schema/custom-field-values.js";
export async function fetchAllFields(contactId) {
    const fields = await db.query.custom_field_values.findMany({
        where: eq(custom_field_values.contact_id, contactId),
        columns: {
            id: true,
            value: true,
            field_key: true,
        },
        with: {
            custom_field_definition: {
                columns: {
                    contact_type: true,
                    label: true,
                    field_type: true,
                },
            },
        },
    });
    const resp = fields.map((field) => ({
        id: field.id,
        field_key: field.field_key,
        contact_type: field?.custom_field_definition?.contact_type,
        label: field?.custom_field_definition?.label,
        field_type: field?.custom_field_definition?.field_type,
        value: field.value,
    }));
    return resp;
}
