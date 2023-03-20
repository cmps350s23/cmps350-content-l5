import path from 'path'
import { promises as fs } from 'fs'

const dataPath = path.join(process.cwd(), 'data/hero.json')

export async function getHeroes() {
  const fileContent = await fs.readFile(dataPath, 'utf8')
  //Return the content of the data file in json format
  return JSON.parse(fileContent)
}

export async function getHero(heroId) {
  const heroes = await getHeroes()
  const hero = heroes.find((h) => h.id == heroId)
  if (hero != 'undefined') {
    return hero
  } else {
    throw new Error('No record found')
  }
}

export async function addHero(hero) {
  let heroes = await getHeroes()
  //Get the last Id used +1
  let maxId = Math.max(...heroes.map((h) => h.id)) + 1
  console.log('maxId', maxId)

  hero.id = maxId
  heroes.push(hero)
  await fs.writeFile(dataPath, JSON.stringify(heroes))
  return hero
}

export async function updateHero(hero) {
  let heroes = await getHeroes()

  // Look for the hero to be updated then update it
  const foundIndex = heroes.findIndex((h) => h.id == hero.id)
  //console.log('heroRepository.updateHero.foundIndex', foundIndex, hero.id)

  if (foundIndex >= 0) {
    // Merge the 2 objects
    Object.assign(heroes[foundIndex], hero)
    //console.log('heroRepository.updateHero', hero)
    await fs.writeFile(dataPath, JSON.stringify(heroes))
  }
}

export async function deleteHero(heroId) {
  let heroes = await getHeroes()

  // Look for the hero to be deleted then remove it
  const foundIndex = heroes.findIndex((h) => h.id == heroId)

  if (foundIndex >= 0) {
    heroes.splice(foundIndex, 1)
    //console.log('heroController.deleteHero', heroId)
    await fs.writeFile(dataPath, JSON.stringify(heroes))
  }
}