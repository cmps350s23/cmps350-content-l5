import { getCat, addCat, updateCat } from "../cat-repo";
import LikeButton from "../like-button";
import { redirect } from "next/navigation";

export default async function CatEditPage({ params }) {
  // Fetch data
  const catId = params.id;
  console.log("CatEditPage - catId", catId);

  // In case of update get the cat details
  let cat;
  if (catId && catId !== "new") {
    cat = await getCat(catId);
    console.log("CatEditPage - cat", cat);
  }

  async function onSubmit(formData) {
    "use server";

    // Mutate data
    const cat = {
      name: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      breed: formData.get("breed"),
    };

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
      <form action={onSubmit}>
        <input name="id" type="hidden" defaultValue={cat?.id} />
        <label>Name</label>
        <input name="title" type="text" defaultValue={cat?.name} />
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
