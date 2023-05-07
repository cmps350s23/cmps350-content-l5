//import { revalidatePath } from "next/cache";
import { getCats, likeCat } from "./cat-repo";
import LikeButton from "./like-button";
// Import onLikeCatHandler server action function
// Strangely, this import does NOT work!!!
//import { onLikeCatHandler } from "./_actions";

export default async function CatsPage() {
  // Fetch data
  const cats = await getCats();
  console.log("cats", cats);

  async function likeCatHandler(catId) {
    "use server";
    console.log("likeCat - catId", catId);

    const likesCount = await likeCat(catId);
    console.log("likesCount", likesCount);
    return likesCount;
  }

  return (
    <div>
      <h2>Cats</h2>
      <a href={`/cats/new`}>Add cat</a>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            <a href={`/cats/${cat.id}`}>{cat.name}</a> ({cat.breed})
            <LikeButton
              catId={cat.id}
              likesCount={cat.likes}
              onLikeCat={likeCatHandler}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
