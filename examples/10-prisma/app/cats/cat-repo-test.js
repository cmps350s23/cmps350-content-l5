import { addCat, getCat } from "./cat-repo.js";

const cat = await getCat(1);
console.log(cat);
