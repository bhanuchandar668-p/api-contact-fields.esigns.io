import { randBetweenDate, random } from "@ngneat/falso";
import seederDB from "./seeder-db.js";
import { contacts_data } from "../src/db/schema/contacts-data.js";

async function seedContactsDataFields() {
  let totalContacts = 100000;
  let batchSize = 100;
  let contactId = 1;

  const genderArr = ["male", "female"];

  for (let i = 0; i < totalContacts; i += batchSize) {
    const contactsDataBatch = [];

    const contactsDataRecord = [
      {
        contact_id: contactId,
        field_key: "dob",
        field_type: "date",
        label: "DOB",
        value: randBetweenDate({ from: "1990-01-01", to: "2000-01-01" }),
      },
      {
        contact_id: contactId,
        field_key: "gender",
        field_type: "text",
        label: "Gender",
        value: genderArr[Number(i % 2 === 0)],
      },
    ];

    contactsDataBatch.push(...contactsDataRecord);
    contactId += 1;

    await processBatches(contactsDataBatch);

    console.log(
      `Processed batch ${Math.floor(i / batchSize) + 1} (contacts ${
        i + 1
      }-${Math.min(i + batchSize, totalContacts)})`
    );
  }
}

async function processBatches(contactsDataBatch: any[]) {
  // Use a transaction to ensure both inserts succeed or fail together
  await seederDB.transaction(async (tx) => {
    // Then insert contact data with references to the contacts
    await tx.insert(contacts_data).values(contactsDataBatch);
  });

  // Small delay to prevent overwhelming the database
  return new Promise((resolve) => setTimeout(resolve, 10));
}
