import Contact from "../models/contact.js";

export const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find({ owner });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
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
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);
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
    const { _id: owner } = req.user;

    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone, owner });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Помилка при створенні контакту" });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  try {
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateContact) {
      res.status(200).json(updateContact);
    } else {
      res.status(404).json({ message: "Контакт не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні контакту" });
  }
};

export const updateFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updateContact) {
      res.status(200).json(updateContact);
    } else {
      res.status(404).json({ message: "Контакт не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні контакту" });
  }
};
