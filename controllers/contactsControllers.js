import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error getting contact" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при видаленні контакту" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsService.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Помилка при створенні контакту" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateContact = await contactsService.updateContact(id, req.body);
    if (updateContact) {
      res.status(200).json(updateContact);
    } else {
      res.status(404).json({ message: "Контакт не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні контакту" });
  }
};
