import { readJSON } from "../utils.js";

export async function getConfDates() {
  return await readJSON("data/conf-dates.json");
}
