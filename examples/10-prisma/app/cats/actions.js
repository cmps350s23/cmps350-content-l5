"use server";
import { revalidatePath } from "next/cache";
import { likeCat, deleteCat } from "./cat-repo";

export async function onLikeCat(catId) {
  console.log("onLikeCat - catId", catId);
  return await likeCat(catId);
}

export async function onDeleteCat(catId) {
  console.log("onDeleteCat - catId", catId);
  deleteCat(catId);
  revalidatePath("/cats");
}
