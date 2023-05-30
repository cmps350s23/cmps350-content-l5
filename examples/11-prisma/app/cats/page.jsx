import { getCats } from "./cat-repo"
import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"
import { onDeleteCat } from "./actions"
import Image from "next/image"

export default async function CatsPage() {
  // Fetch data
  const cats = await getCats()
  //console.log("cats", cats);

  return (
    <div>
      <h2>Cats</h2>
      <a href={`/cats/new`}>Add cat</a>
      <ul style={{ listStyle: "none" }}>
        {cats.map((cat) => (
          <li key={cat.id}>
            <img src={cat.imageUrl} width={150} />
            <br />
            <a href={`/cats/${cat.id}`}>{cat.name}</a> ({cat.breed})
            <DeleteButton id={cat.id} onClicked={onDeleteCat} />
            <LikeButton catId={cat.id} likesCount={cat.likes} />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  )
}
