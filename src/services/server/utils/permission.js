const EventSchema = require("../models/Event");
const util = require("./getUserByToken");

const allowedEvent = async (token, eventID) => {
  const user = await util.getUser(token);

  if (!user) {
    return null;
  }

  // busca evento no banco
  try {
    const event = await EventSchema.findById(eventID);

    // verificar se o usuario eh um dos assistentes
    const assistant = event.assistants.reduce((noAssistant, assistant) => {
      return (noAssistant = assistant != user._id);
    }, true);

    // verificar se o usuario tem permissao para realizar update neste evento, caso nao tenha, estrara no if
    if (event.coordinator != user._id && assistant) {
      return null;
    }
  } catch (error) {
    return null;
  }

  return true;
};

module.exports = {
  allowedEvent,
};
