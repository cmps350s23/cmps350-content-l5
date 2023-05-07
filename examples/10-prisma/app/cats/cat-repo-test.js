import { addCat, getCat } from "./cat-repo.js";

/*const cat = await addCat({
  name: "Garfield",
  image: "mycat.png",
  breed: "Persian cat",
});*/
const cat = await getCat(1);
console.log(cat);
