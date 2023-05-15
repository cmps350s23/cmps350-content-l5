//import { PrismaClient } from "@prisma/client"
const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

async function main() {
  const prisma = new PrismaClient()
  const saltRounds = 10
  const encryptedPassword = await bcrypt.hash("pass123", saltRounds)

  try {
    const user1 = await prisma.user.upsert({
      where: { email: "jd@jwt.com" },
      update: {},
      create: {
        name: "Jane Doe",
        email: "jd@jwt.com",
        password: encryptedPassword,
        role: "Admin",
        image: "https://cdn-icons-png.flaticon.com/512/2507/2507657.png",
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

// Abbas
// https://mir-s3-cdn-cf.behance.net/projects/404/ebab9f28815813.55d3ce0e7caef.jpg
