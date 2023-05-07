import { revalidatePath } from "next/cache";
import { getCat, updateCat, likeCat } from "../../cat-repo";
import LikeButton from "../../like-button";
import { redirect } from "next/navigation";

export default async function CatEditPage({ params }) {
  // Fetch data
  const catId = params.id;
  console.log("CatEditPage - catId", catId);
  const cat = await getCat(catId);
  console.log("CatEditPage - cat", cat);

  async function likeCat(catId) {
    "use server";
    console.log("likeCat - catId", catId);

    const likesCount = await likeCat(catId);
    console.log("likesCount", likesCount);
    // Revalidate to re-render the UI
    revalidatePath(`/cats/${catId}/edit`);
  }

  async function onSaveThenExit(formData) {
    "use server";

    // Mutate data
    //const cat = Object.fromEntries(formData.entries());
    const cat = {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    };

    console.log("onSubmit", cat);

    await updateCat(catId, cat);
    // Redirect to list of cats
    redirect("/cats");
  }

  async function onSubmit(formData) {
    "use server";

    // Mutate data
    //const cat = Object.fromEntries(formData.entries());
    const cat = {
      name: formData.get("title"),
      image: formData.get("image"),
      breed: formData.get("breed"),
    };

    console.log("onSubmit", cat);

    await updateCat(catId, cat);
    // Revalidate to re-render the UI
    revalidatePath(`/cats/${params.id}/edit`);
  }

  return (
    <div>
      <h2>Edit {cat?.name}</h2>
      <form action={onSubmit}>
        <label>Name</label>
        <input name="title" type="text" defaultValue={cat?.name} />
        <br />
        <label>Image</label>
        <input name="image" type="text" defaultValue={cat?.image} />
        <br />
        <label>Breed</label>
        <input name="breed" type="text" defaultValue={cat?.breed} />
        <br />
        <button type="submit">Save</button>
        <button type="submit" formAction={onSaveThenExit}>
          Save and Exit
        </button>
      </form>
      <br />
      <LikeButton catId={cat?.id} likesCount={cat?.likes} onLikeCat={likeCat} />
    </div>
  );
}
