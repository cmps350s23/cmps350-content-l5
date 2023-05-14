//import { PrismaClient } from "@prisma/client"
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

async function main() {
  const prisma = new PrismaClient()
  const saltRounds = 10
  const encryptedPassword = await bcrypt.hash("pass123", saltRounds)

  try {
    const user1 = await prisma.user.upsert({
      where: { email: "jane.doe@jwt.com" },
      update: {},
      create: {
        name: "Jane Doe",
        email: "jane.doe@jwt.com",
        password: encryptedPassword,
        posts: {
          create: [
            {
              title: "Follow Prisma on Twitter",
              content: "https://twitter.com/prisma",
              published: true,
            },
            {
              title: "Follow next-auth on Twitter",
              content: "https://twitter.com/nextauthjs",
              published: true,
            },
          ],
        },
      },
    })
    console.log(user1)
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    await prisma.$disconnect()
  }
}

main().then(() => console.log("Seeding complete"))
