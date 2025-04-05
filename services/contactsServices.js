import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Error finding contacts:", error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const contactToRemove = allContacts.find(
      (contact) => contact.id === contactId
    );
    if (!contactToRemove) {
      return null;
    }
    const filteredContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    return contactToRemove;
  } catch (error) {
    console.error("Error finding contact:", error);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact };
