import Bulb from "./Bulb";
import Counter from "./Counter";

export default async function BulbPage() {
  return (
    <>
      <Bulb />
      <br />
      <br />
      <Counter startValue={3} />
    </>
  );
}
