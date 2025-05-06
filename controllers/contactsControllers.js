import Contact from "../models/contact.js";

export const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const contacts = await Contact.find({ owner })
      .skip(skip)
      .limit(limit)
      .populate("owner", "name email");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contacts" });
  }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const owner = req.user._id;

  try {
    const contact = await Contact.findOne({ _id: id, owner });
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
    const contact = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });
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
    const updateContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      req.body,
      { new: true }
    );
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
    const updateContact = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (updateContact) {
      res.status(200).json(updateContact);
    } else {
      res.status(404).json({ message: "Контакт не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ message: "Помилка при оновленні контакту" });
  }
};
