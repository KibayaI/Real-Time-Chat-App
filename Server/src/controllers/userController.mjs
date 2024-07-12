import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function addUser(req, res) {
  const { body } = req;
  const createdUser = await prisma.users.create({
    data: body,
  });
  res.send(createdUser);
}

async function getUsers(req, res) {
  try {
    const users = await prisma.users.findMany();
    // res.set("Access-Control-Allow-Origin", "*");
    res.send(users);
  } catch (err) {
    res.send("error");
    console.log(err);
  }
}
export const users = { addUser, getUsers };
