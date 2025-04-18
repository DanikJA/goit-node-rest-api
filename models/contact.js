import { Schema, model } from "mongoose";

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
export default Contact;
