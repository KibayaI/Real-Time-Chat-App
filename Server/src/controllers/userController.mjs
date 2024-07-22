import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function addUser(req, res) {
  const { username, email, password, gender } = req.body;
  const encryptedPass = await bcrypt.hash(password, 10);

  try {
    const createdUser = await prisma.users.create({
      data: {
        username,
        email,
        password: encryptedPass,
        gender,
      },
    });
    delete createdUser.password;
    res.send(createdUser);
  } catch (error) {
    res.json({
      error: error,
    });
  }
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

async function login(req, res) {
  const credentials = JSON.parse(req.params.credentials);

  const user = await prisma.users.findUnique({
    where: {
      email: credentials.email,
      // password: credentials.password,
    },
    select: {
      id: true,
      username: true,
      gender: true,
      email: true,
    },
  });
  console.log(user);
  // if (user && user.password === credentials.password) {
  res.json({
    data: user,
    //   });
    // } else {
    //   res.json({
    //     error: "Incorrect credentials!!!",
  });
  // }
}
export const users = { addUser, getUsers, login };
