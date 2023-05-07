"use server";
import { likeCat } from "./cat-repo";

export async function onLikeCatHandler(catId) {
  console.log("likeCat", catId);

  const likesCount = await likeCat(catId);
  console.log("likesCount", likesCount);
  return likesCount;
}
