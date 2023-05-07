import { revalidatePath } from "next/cache";
import { getCats, likeCat } from "./cat-repo";
import LikeButton from "./like-button";

//import { useTransition } from "react";

export default async function CatsPage() {
  // Fetch data
  const cats = await getCats();
  console.log("cats", cats);

  async function likeCat(catId) {
    "use server";
    console.log("likeCat", catId);

    const likesCount = await likeCat(catId);
    console.log("likesCount", likesCount);
    // Revalidate to re-render the UI
    revalidatePath("/cats");
  }

  return (
    <div>
      <h2>Cats</h2>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            <a href={`/cats/${cat.id}/edit`}>{cat.name}</a> ({cat.breed})
            <LikeButton
              catId={cat.id}
              likesCount={cat.likes}
              onLikeCat={likeCat}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
