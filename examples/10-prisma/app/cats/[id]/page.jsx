import { getCat, addCat, updateCat } from "../cat-repo";
import LikeButton from "../LikeButton";
import { redirect } from "next/navigation";

export default async function CatForm({ params }) {
  // Fetch data
  const catId = params.id;
  console.log("CatForm - catId", catId);

  // In case of update get the cat details
  let cat;
  if (catId && catId !== "new") {
    cat = await getCat(catId);
    console.log("CatForm - cat", cat);
  }

  async function onSubmitHandler(formData) {
    "use server";

    const { name, imageUrl, breed } = Object.fromEntries(formData.entries());
    const cat = { name, imageUrl, breed };
    // Or use a simpler way as shown below
    /*const cat = {
      name: formData.get("name"),
      imageUrl: formData.get("imageUrl"),
      breed: formData.get("breed"),
    };*/

    console.log("onSubmit - cat:", cat);

    const catId = formData.get("id");
    console.log("onSubmit - catId:", catId);

    // If catId is not undefined then update the cat otherwise add it
    if (catId) {
      await updateCat(catId, cat);
    } else {
      await addCat(cat);
    }
    // Redirect to list of cats
    redirect("/cats");
  }

  return (
    <div className="center">
      {cat ? <h3>Edit Cat {cat?.name}</h3> : <h3>Add Cat</h3>}
      <br />
      <form action={onSubmitHandler}>
        <input name="id" type="hidden" defaultValue={cat?.id} />
        <label>Name</label>
        <input name="name" type="text" defaultValue={cat?.name} />
        <label>Image</label>
        <input name="imageUrl" type="text" defaultValue={cat?.imageUrl} />
        <label>Breed</label>
        <input name="breed" type="text" defaultValue={cat?.breed} />
        <button type="submit">Submit</button>
      </form>
      <br />
      {/* When updating a cat show the Like button */}
      {cat && <LikeButton catId={cat?.id} likesCount={cat?.likes} />}
    </div>
  );
}
