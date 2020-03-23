const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    cpf: {
      type: Number,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    avatar: String,
    created_at: {
      type: Date,
      default: Date.now
    },
    update_at: Date,
    admin: Boolean,
    events: Array,
    events_admin: Array
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000
    }
  }
);

UserSchema.pre("save", async function(next) {
  var user = this;

  // gera o salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  if (!salt) {
    return next({
      success: false,
      error: "Error to create Salt"
    });
  }

  // hash o password usando o novo salt
  if (user.password && user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, salt);
    if (!hash) {
      return next({
        success: false,
        error: "Error to ecrypt password"
      });
    }

    // sobrescreve o o password com o hashed
    user.password = hash;

    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
