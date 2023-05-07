import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const alice = await prisma.user.upsert({
  where: { email: "alice@prisma.io" },
  update: {},
  create: {
    email: "alice@prisma.io",
    name: "Alice",
    posts: {
      create: {
        title: "Check out Prisma with Next.js",
        content: "https://www.prisma.io/nextjs",
        published: true,
      },
    },
  },
});

console.log(alice);
/*
const users = await prisma.user.findMany({
  where: {
    email: { contains: "example.com" },
  },
});
console.log(users);
*/
