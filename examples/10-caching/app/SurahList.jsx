import Link from "next/link"

export default async function SurahList() {
  const url = "https://api.quran.com/api/v4/chapters"
  const response = await fetch(url)
  const surahs = (await response.json()).chapters
  console.log(`SurahList - Surah count: ${surahs.length}`)
  return (
    <>
      <ol>
        {surahs.map((surah) => (
          <li value={surah.id} key={surah.id}>
            <Link href={`/${surah.id}`}>
              {surah.name_arabic} - {surah.name_simple}
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
