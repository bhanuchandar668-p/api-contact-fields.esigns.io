import {
  randFirstName,
  randLastName,
  randEmail,
  randAddress,
  randPhoneNumber,
  randCompanyName,
} from "@ngneat/falso";
import { contacts } from "../src/db/schema/contacts.js";
import { contacts_data } from "../src/db/schema/contacts-data.js";
import seederDB from "./seeder-db.js";

async function seedContacts() {
  const totalContacts = 100000;
  const batchSize = 100;
  let contactId = 1;

  for (let i = 0; i < totalContacts; i += batchSize) {
    const contactsBatch = [];
    const contactsDataBatch = [];

    for (let j = 0; j < batchSize && contactId <= totalContacts; j++) {
      let address: any = randAddress();
      address = Object.values(address).join(" ");
      
      // Generate contact data
      const firstName = randFirstName();
      const lastName = randLastName();
      const company = randCompanyName();
      const phoneNumber = randPhoneNumber();
      const email = randEmail();

      // Create contact record
      const contact = {
        id: contactId,
        email,
        first_name: firstName,
        last_name: lastName,
        address,
        phone_number: phoneNumber,
        company,
      };
      contactsBatch.push(contact);

      // Create contact_data records for each field
      const contactDataRecords = [
        {
          contact_id: contactId,
          field_key: 'first_name',
          label: 'First Name',
          value: firstName,
        },
        {
          contact_id: contactId,
          field_key: 'last_name',
          label: 'Last Name',
          value: lastName,
        },
        {
          contact_id: contactId,
          field_key: 'company',
          label: 'Company',
          value: company,
        },
        {
          contact_id: contactId,
          field_key: 'phone_number',
          label: 'Phone Number',
          value: phoneNumber,
        },
        {
          contact_id: contactId,
          field_key: 'email',
          label: 'Email',
          value: email,
        },
        {
          contact_id: contactId,
          field_key: 'address',
          label: 'Address',
          value: address,
        }
      ];

      contactsDataBatch.push(...contactDataRecords);
      contactId++;
    }

    // Process both batches in a transaction to maintain integrity
    await processBatches(contactsBatch, contactsDataBatch);
    
    console.log(
      `Processed batch ${Math.floor(i / batchSize) + 1} (contacts ${
        i + 1
      }-${Math.min(i + batchSize, totalContacts)})`
    );
  }

  console.log("All contacts and contact data seeded successfully!");
}

async function processBatches(contactsBatch: any[], contactsDataBatch: any[]) {
  // Use a transaction to ensure both inserts succeed or fail together
  await seederDB.transaction(async (tx) => {
    // Insert contacts first
    await tx.insert(contacts).values(contactsBatch);
    
    // Then insert contact data with references to the contacts
    await tx.insert(contacts_data).values(contactsDataBatch);
  });

  // Small delay to prevent overwhelming the database
  return new Promise((resolve) => setTimeout(resolve, 10));
}

// Usage
seedContacts().catch(console.error);