import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addMessage(req, res) {
  try {
    const { from, to, text } = req.body;
    const createdMessage = await prisma.messages.create({
      data: {
        text,
        from,
        to,
        senderId: from,
      },
    });

    console.log(createdMessage);

    res.json({
      info: "Message added to the database",
      data: createdMessage,
    });
  } catch (error) {
    res.send(error);
  }
}

async function getMessages(req, res) {
  try {
    const messageDB = [];
    const { from, to } = req.body;

    const messagesFrom = await prisma.messages.findMany({
      where: {
        to: to.id,
        from: from.id,
      },
    });

    messageDB.push(...messagesFrom);

    const messagesTo = await prisma.messages.findMany({
      where: {
        to: from.id,
        from: to.id,
      },
    });

    messageDB.push(...messagesTo);

    res.send(messageDB);
  } catch (error) {
    res.send(error);
  }
}

export const message = { addMessage, getMessages };
