import { PrismaClient } from "@prisma/client";
import path from "path";
import { promises as fs } from "fs";

async function readJSON(filePath) {
  const dataPath = path.join(process.cwd(), filePath);
  const fileContent = await fs.readFile(dataPath, "utf8");
  return JSON.parse(fileContent);
}

async function main() {
  const prisma = new PrismaClient();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  await prisma.cat.deleteMany();

  try {
    const cat1 = await prisma.cat.create({
      data: {
        name: "Garfield",
        imageUrl: "garfield.png",
        breed: "Persian",
      },
    });
    console.log(cat1);

    const cat2 = await prisma.cat.create({
      data: {
        name: "Luna",
        imageUrl: "luna.png",
        breed: "American Shorthair",
      },
    });
    console.log(cat2);

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

    const users = await readJSON("data/users.json");
    //console.log(users);
    // createMany is not supported by SQLite. Use create instead
    for (const user of users) await prisma.user.create({ data: user });

    const blogs = await readJSON("data/blogs.json");
    //console.log(blogs);
    for (const blog of blogs) await prisma.blog.create({ data: blog });
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await prisma.$disconnect();
  }
}

await main();
