import { readJSON } from "@/app/lib/utils"

export async function getConfDates() {
  return await readJSON("data/conf-dates.json")
}
