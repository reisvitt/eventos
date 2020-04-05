const jwt = require("./jwt");
const UserSchema = require("../models/User");

const getUser = async (token) => {
  try {
    const result = jwt.verify(token);

    const user = await UserSchema.findById(result.payload);

    return user;
  } catch (error) {
    console.log("catch");
    return null;
  }
};

module.exports = { getUser };
