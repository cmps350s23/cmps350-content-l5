import FavoriteColor from "./FavoriteColor";
import NewsSearch from "./NewsSearch";
import WindowSize from "./WindowSize";

export default async function UseEffectPage() {
  return (
    <>
      <FavoriteColor />
      <br />
      <WindowSize />
      <NewsSearch />
    </>
  );
}
