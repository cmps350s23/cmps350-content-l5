import { addUser, getUsers, getUsersWithPosts, updatePost, deleteUserByEmail } from "./blogs-repo.js"

async function main() {
  try {
    // nested write query - creates a user and post
    await deleteUserByEmail("samir@prisma.io")

    const user = await addUser({
      name: "samir",
      email: "samir@prisma.io",
      posts: {
        create: { title: 'Hello World', content: 'This is my first post' }
      }
    })
    console.log(user)

   const usersWithPosts = await getUsersWithPosts()
   console.dir(usersWithPosts, { depth: null })

   const post = await updatePost(1, { published: true })
   console.log(post)

  } catch (e) {
    console.error(e)
  } 
  //finally {
    //await prisma.$disconnect()
  //}
}

await main()