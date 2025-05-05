import { Schema, model } from "mongoose";
import Joi from "joi";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    error.status = 400;
  }
  next(error);
});

const Contact = model("contact", contactSchema);

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?\d{7,15}$/)
    .required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?\d{7,15}$/),
}).min(1);

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export default Contact;
