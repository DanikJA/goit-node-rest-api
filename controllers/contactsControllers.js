import contactsService from "../services/contactsServices.js";

export const getAllContacts = (req, res) => {
  try {
    contacts = contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

export const getOneContact = (req, res) => {};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
