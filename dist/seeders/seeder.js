import { custom_field_definitions } from "../src/db/schema/custom-field-definitions.js";
import { CustomFields } from "./custom-fields.js";
import seederDB from "./seeder-db.js";
async function seedCustomFields() {
    console.log("Seeding custom fields...");
    for (const field of CustomFields) {
        await seederDB.insert(custom_field_definitions).values(field);
    }
    console.log("Custom fields seeded successfully.");
}
(async () => await seedCustomFields())();
