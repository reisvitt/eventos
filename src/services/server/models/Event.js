const mongoose = require("mongoose");
const UserSchema = require("./User")

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    start_date: Date,
    end_date: Date,
    picture: String,
    address: [
      {
        address: String, 
        contact: String, 
        email: String
      }
    ],
    start_subscribe: Date,
    end_subscribe: Date,
    accountable: String,
    description: String,
    activities: [String], // contem o id das atividades
    price: Number,
    coordinator: {
      type: UserSchema,
      required: true
    },
    assistants: [String], // contem o id dos auxiliares
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: Date,
    is_available: {
      type: Boolean,
      default: true,
    },
    payment_address: [
      {
        address: String,
        contact: String,
        email: String
      }
    ],
  }
)

module.exports = mongoose.model("Event", EventSchema)