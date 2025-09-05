import { randFirstName, randLastName, randEmail, randAddress, randPhoneNumber, randCompanyName, randJobTitle, randDepartment, randCity, randState, randZipCode, randCountry, randPastDate, randFutureDate, randUserName, randUrl, randSkill, randQuote, randJobDescriptor, randJobArea, } from "@ngneat/falso";
import { contacts } from "../src/db/schema/contacts.js";
import seederDB from "./seeder-db.js";
import { contacts_data } from "../src/db/schema/contacts-data.js";
// Define meaningful field keys and labels
const BASE_FIELDS = [
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "company", label: "Company" },
    { key: "phone_number", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
];
const EXTRA_FIELDS_10 = [
    {
        key: "job_title",
        label: "Job Title",
        type: "text",
        generator: randJobTitle,
    },
    {
        key: "department",
        label: "Department",
        type: "text",
        generator: randDepartment,
    },
    { key: "city", label: "City", type: "text", generator: randCity },
    { key: "state", label: "State", type: "text", generator: randState },
    { key: "zip_code", label: "Zip Code", type: "text", generator: randZipCode },
    { key: "country", label: "Country", type: "text", generator: randCountry },
    {
        key: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        generator: () => randPastDate().toISOString().split("T")[0],
    },
    {
        key: "date_of_join",
        label: "Date of Join",
        type: "date",
        generator: () => randPastDate({ years: 5 }).toISOString().split("T")[0],
    },
    {
        key: "linkedin",
        label: "LinkedIn",
        type: "text",
        generator: () => `https://linkedin.com/in/${randUserName()}`,
    },
    { key: "website", label: "Website", type: "text", generator: randUrl },
];
const EXTRA_FIELDS_20 = [
    {
        key: "job_title",
        label: "Job Title",
        type: "text",
        generator: randJobTitle,
    },
    {
        key: "department",
        label: "Department",
        type: "text",
        generator: randDepartment,
    },
    { key: "city", label: "City", type: "text", generator: randCity },
    { key: "state", label: "State", type: "text", generator: randState },
    { key: "zip_code", label: "Zip Code", type: "text", generator: randZipCode },
    { key: "country", label: "Country", type: "text", generator: randCountry },
    {
        key: "date_of_birth",
        label: "Date of Birth",
        type: "date",
        generator: () => randPastDate().toISOString().split("T")[0],
    },
    {
        key: "date_of_join",
        label: "Date of Join",
        type: "date",
        generator: () => randPastDate({ years: 5 }).toISOString().split("T")[0],
    },
    {
        key: "linkedin",
        label: "LinkedIn",
        type: "text",
        generator: () => `https://linkedin.com/in/${randUserName()}`,
    },
    { key: "website", label: "Website", type: "text", generator: randUrl },
    {
        key: "skills",
        label: "Skills",
        type: "text",
        generator: () => randSkill() + ", " + randSkill() + ", " + randSkill(),
    },
    {
        key: "salary_range",
        label: "Salary Range",
        type: "text",
        generator: () => `$${Math.floor(Math.random() * 100000) + 50000}-$${Math.floor(Math.random() * 150000) + 100000}`,
    },
    {
        key: "education",
        label: "Education",
        type: "text",
        generator: () => ["Bachelor's Degree", "Master's Degree", "PhD", "High School Diploma"][Math.floor(Math.random() * 4)],
    },
    {
        key: "experience_years",
        label: "Years of Experience",
        type: "text",
        generator: () => (Math.floor(Math.random() * 30) + 1).toString(),
    },
    {
        key: "work_status",
        label: "Work Status",
        type: "text",
        generator: () => ["Full-time", "Part-time", "Contract", "Freelance"][Math.floor(Math.random() * 4)],
    },
    {
        key: "preferred_contact",
        label: "Preferred Contact",
        type: "text",
        generator: () => ["Email", "Phone", "Text", "LinkedIn"][Math.floor(Math.random() * 4)],
    },
    {
        key: "timezone",
        label: "Timezone",
        type: "text",
        generator: () => ["EST", "PST", "CST", "MST", "GMT"][Math.floor(Math.random() * 5)],
    },
    {
        key: "language",
        label: "Language",
        type: "text",
        generator: () => ["English", "Spanish", "French", "German", "Chinese"][Math.floor(Math.random() * 5)],
    },
    {
        key: "emergency_contact",
        label: "Emergency Contact",
        type: "text",
        generator: randPhoneNumber,
    },
    { key: "notes", label: "Notes", type: "text", generator: randQuote },
];
async function seedContacts() {
    const totalContacts = 100000;
    const batchSize = 100;
    let contactId = 1;
    for (let i = 0; i < totalContacts; i += batchSize) {
        const contactsBatch = [];
        const contactsDataBatch = [];
        for (let j = 0; j < batchSize && contactId <= totalContacts; j++) {
            let address = randAddress();
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
            // Determine which extra fields to include based on contact ID range
            let extraFields = [];
            if (contactId <= 10000) {
                // First 10,000 contacts: 10 extra fields
                extraFields = EXTRA_FIELDS_10;
            }
            else if (contactId <= 30000) {
                // Next 20,000 contacts: 20 extra fields (contacts 10,001-30,000)
                extraFields = EXTRA_FIELDS_20;
            }
            // Remaining contacts (30,001-100,000) get only base fields
            // Create base contact_data records
            const baseRecords = [
                {
                    contact_id: contactId,
                    field_key: "first_name",
                    label: "First Name",
                    value: firstName,
                    field_type: "text",
                },
                {
                    contact_id: contactId,
                    field_key: "last_name",
                    label: "Last Name",
                    value: lastName,
                    field_type: "text",
                },
                {
                    contact_id: contactId,
                    field_key: "company",
                    label: "Company",
                    value: company,
                    field_type: "text",
                },
                {
                    contact_id: contactId,
                    field_key: "phone_number",
                    label: "Phone Number",
                    value: phoneNumber,
                    field_type: "text",
                },
                {
                    contact_id: contactId,
                    field_key: "email",
                    label: "Email",
                    value: email,
                    field_type: "text",
                },
                {
                    contact_id: contactId,
                    field_key: "address",
                    label: "Address",
                    value: address,
                    field_type: "text",
                },
            ];
            // Create extra field records
            const extraRecords = extraFields.map((field) => ({
                contact_id: contactId,
                field_key: field.key,
                label: field.label,
                field_type: field.type,
                value: field.generator(),
            }));
            contactsDataBatch.push(...baseRecords, ...extraRecords);
            contactId++;
        }
        // Process both batches in a transaction to maintain integrity
        await processBatches(contactsBatch, contactsDataBatch);
        console.log(`Processed batch ${Math.floor(i / batchSize) + 1} (contacts ${i + 1}-${Math.min(i + batchSize, totalContacts)}) - ${contactsDataBatch.length / contactsBatch.length} fields per contact`);
    }
    console.log("All contacts and contact data seeded successfully!");
    console.log("Summary:");
    console.log("- Contacts 1-10,000: 6 base fields + 10 extra fields = 16 fields each");
    console.log("- Contacts 10,001-30,000: 6 base fields + 20 extra fields = 26 fields each");
    console.log("- Contacts 30,001-100,000: 6 base fields only = 6 fields each");
}
async function processBatches(contactsBatch, contactsDataBatch) {
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
