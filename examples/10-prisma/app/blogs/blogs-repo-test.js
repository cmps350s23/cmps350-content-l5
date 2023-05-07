import {
  addUser,
  getUsers,
  getUsersWithPosts,
  deleteUserByEmail,
} from "./users-repo.js";
import { updatePost } from "./blogs-repo.js";

async function main() {
  try {
    // nested write query - creates a user and post
    await deleteUserByEmail("samir@prisma.io");

    const user = await addUser({
      name: "samir",
      email: "samir@prisma.io",
      posts: {
        create: { title: "Hello World", content: "This is my first post" },
      },
    });
    console.log(user);

    const usersWithPosts = await getUsersWithPosts();
    console.dir(usersWithPosts, { depth: null });

    const post = await updatePost(1, { published: true });
    console.log(post);
  } catch (e) {
    console.error(e);
  }
  //finally {
  //await prisma.$disconnect()
  //}

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
}

await main();
