import { revalidatePath } from "next/cache";
import { getCat, addCat, updateCat, likeCat } from "../cat-repo";
import LikeButton from "../like-button";
import { redirect } from "next/navigation";

export default async function CatEditPage({ params }) {
  // Fetch data
  const catId = params.id;
  console.log("CatEditPage - catId", catId);

  let cat;
  if (catId && catId !== "new") {
    cat = await getCat(catId);
    console.log("CatEditPage - cat", cat);
  }

  async function likeCatHandler(catId) {
    "use server";
    console.log("likeCat - catId", catId);

    const likesCount = await likeCat(catId);
    console.log("likesCount", likesCount);
    return likesCount;
    // Revalidate to re-render the UI
    // revalidatePath(`/cats/${catId}/edit`);
  }

  async function onSaveThenExit(formData) {
    "use server";

    // Mutate data
    const cat = {
      name: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      breed: formData.get("breed"),
    };

    console.log("onSubmit - cat:", cat);

    const catId = formData.get("id");
    console.log("onSaveThenExit - catId:", catId);

    if (catId) {
      await updateCat(catId, cat);
    } else {
      await addCat(cat);
    }
    // Redirect to list of cats
    redirect("/cats");
  }

  async function onSubmit(formData) {
    "use server";
    const cat = {
      name: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      breed: formData.get("breed"),
    };
    await updateCat(catId, cat);
    // Revalidate to re-render the UI
    revalidatePath(`/cats/${params.id}/edit`);
  }

  return (
    <div>
      <form action={onSubmit}>
        <input name="id" type="hidden" defaultValue={cat?.id} />
        <label>Name</label>
        <input name="title" type="text" defaultValue={cat?.name} />
        <br />
        <label>Image</label>
        <input name="imageUrl" type="text" defaultValue={cat?.imageUrl} />
        <br />
        <label>Breed</label>
        <input name="breed" type="text" defaultValue={cat?.breed} />
        <br />
        {cat && <button type="submit">Save</button>}

        <button type="submit" formAction={onSaveThenExit}>
          Save and Exit
        </button>
      </form>
      <br />
      {cat && (
        <LikeButton
          catId={cat?.id}
          likesCount={cat?.likes}
          onLikeCat={likeCatHandler}
        />
      )}
    </div>
  );
}
