import { readJSON } from "@/app/lib/utils"

const dataPath = "data/users.json"

async function getUsers() {
  const users = await readJSON(dataPath)
  return users
}

export const login = async (email, password) => {
  const users = await getUsers()
  const user = users.find((u) => u.email == email && u.password == password)
  if (!user) throw new Error("Login Failed. Invalid email or password")
  delete user.password
  return user
}

export async function getRandomReviewers() {
  const users = await getUsers()
  const reviewers = users.filter((u) => u.role == "reviewer")

  let randomIndices = new Set()
  while (randomIndices.size !== 2) {
    randomIndices.add(Math.floor(Math.random() * reviewers.length))
  }
  // convert Set to Array
  randomIndices = [...randomIndices]
  const reviewer1 = reviewers[randomIndices[0]].id
  const reviewer2 = reviewers[randomIndices[1]].id
  return [reviewer1, reviewer2]
}
