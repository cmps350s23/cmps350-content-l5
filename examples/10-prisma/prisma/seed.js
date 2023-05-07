import { PrismaClient } from "@prisma/client";
import path from "path";
import { promises as fs } from "fs";

async function getUsers() {
  const dataPath = path.join(process.cwd(), "data/users.json");
  const fileContent = await fs.readFile(dataPath, "utf8");
  //Return the content of the data file in json format
  return JSON.parse(fileContent);
}

async function getBlogs() {
  const dataPath = path.join(process.cwd(), "data/blogs.json");
  const fileContent = await fs.readFile(dataPath, "utf8");
  //Return the content of the data file in json format
  return JSON.parse(fileContent);
}

async function main() {
  const prisma = new PrismaClient();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  try {
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

    const bob = await prisma.user.upsert({
      where: { email: "bob@prisma.io" },
      update: {},
      create: {
        email: "bob@prisma.io",
        name: "Bob",
        posts: {
          create: [
            {
              title: "Follow Prisma on Twitter",
              content: "https://twitter.com/prisma",
              published: true,
            },
            {
              title: "Follow Nexus on Twitter",
              content: "https://twitter.com/nexusgql",
              published: true,
            },
          ],
        },
      },
    });
    console.log({ alice, bob });

    const users = await getUsers();
    console.log(users);
    await Promise.all(
      users.map(async (user) => {
        await prisma.user.create({ data: user });
      })
    );

    const blogs = await getBlogs();
    console.log(blogs);
    await Promise.all(
      blogs.map(async (blog) => {
        await prisma.post.create({ data: blog });
      })
    );
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

await main();
