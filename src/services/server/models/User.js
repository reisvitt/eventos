const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    cpf: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
    can_create_event: {
      type: Boolean,
      default: false,
    },
    update_at: Date,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    events_assistant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    events_coordinator: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

UserSchema.pre("save", async function (next) {
  var user = this;

  // gera o salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  if (!salt) {
    return next({
      success: false,
      error: "Error to create Salt",
    });
  }

  // hash o password usando o novo salt
  if (user.password && user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, salt);
    if (!hash) {
      return next({
        success: false,
        error: "Error to ecrypt password",
      });
    }

    // sobrescreve o o password com o hashed
    user.password = hash;

    next();
  }
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
