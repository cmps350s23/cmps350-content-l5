import { getCat } from "../cat-repo"
import LikeButton from "../LikeButton"

export default async function CatForm({ params }) {
  // Fetch data
  const catId = params.id
  console.log("CatForm - catId", catId)

  // In case of update get the cat details
  let cat
  if (catId && catId !== "new") {
    cat = await getCat(catId)
    console.log("CatForm - cat", cat)
  }

  /*async function onSubmitHandler(formData) {
    "use server"

    const { id, name, breed } = Object.fromEntries(formData.entries())
    const cat = { id, name, breed }
    console.log("onSubmit - cat:", cat)

    upsertCat(cat)
    // Redirect to list of cats
    redirect("/cats")
  }*/

  return (
    <div className="center">
      {cat ? <h3>Edit Cat {cat?.name}</h3> : <h3>Add Cat</h3>}
      <br />
      {cat ? <img src={cat?.imageUrl} width={150} /> : ""}
      <form
        method="post"
        encType="multipart/form-data"
        action="/api/cats"
        //action={onSubmitHandler}
      >
        <input name="id" type="hidden" defaultValue={cat?.id} />
        <label>Name</label>
        <input name="name" type="text" defaultValue={cat?.name} />
        <label>Breed </label>
        <input name="breed" type="text" defaultValue={cat?.breed} />
        <label>Image</label>
        <input type="file" name="fileToUpload" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {/* When updating a cat show the Like button */}
      {cat && <LikeButton catId={cat?.id} likesCount={cat?.likes} />}
    </div>
  )
}
