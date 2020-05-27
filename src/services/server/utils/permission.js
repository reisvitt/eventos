const EventSchema = require("../models/Event");
const util = require("./getUserByToken");

const allowedEvent = async (token, eventID) => {
  const user = await util.getUser(token);

  if (!user) {
    return null;
  }

  try {
    // busca evento no banco
    const event = await EventSchema.findById(eventID);

    // verificar se o usuario eh um dos assistentes
    const assistant = event.assistants.reduce((noAssistant, assistant) => {
      return (noAssistant = assistant != user._id);
    }, true);

    // verificar se o usuario tem permissao para realizar update neste evento, caso nao tenha, estrara no if
    if (event.coordinator + "" != user._id + "" && assistant) {
      return null;
    }

    return true;
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
};

const coordinator = async (token, eventID) => {
  const user = await util.getUser(token);

  if (!user) {
    return null;
  }

  try {
    // busca evento no banco
    const event = await EventSchema.findById(eventID);

    // verificar se o usuario tem permissao para realizar update neste evento, caso nao tenha, estrara no if
    if (event.coordinator + "" != user._id + "") {
      return null;
    }

    return true;
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
};

module.exports = {
  allowedEvent,
  coordinator,
};
