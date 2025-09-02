import { custom_field_values } from "../src/db/schema/custom-field-values.js";
import { CustomFieldValues } from "./custom-fields.js";
import seederDB from "./seeder-db.js";
async function fieldValuesSeeder() {
    for (let i = 0; i < CustomFieldValues.length; i++) {
        let record = CustomFieldValues[i];
        const min = 1;
        const max = 10;
        record.field_id = Math.floor(Math.random() * (max - min + 1)) + min;
        await seederDB.insert(custom_field_values).values(record);
    }
}
(async () => await fieldValuesSeeder())();
