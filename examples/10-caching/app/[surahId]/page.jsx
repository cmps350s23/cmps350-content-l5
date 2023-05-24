import RevalidateButton from "./RevalidateButton"

// Return a list of `params` to populate the [surahId] dynamic segment
export async function generateStaticParams() {
  const url = "https://api.quran.com/api/v4/chapters"
  const response = await fetch(url)
  const surahs = (await response.json()).chapters
  console.log(`AyaListPage - Surah count: ${surahs.length}`)

  return surahs.map((surah) => ({
    surahId: surah.id.toString(),
  }))
}

async function getVerses(surahId) {
  console.log(`Selected Surah: ${surahId}`)
  if (surahId == 0) return []
  const url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`
  const response = await fetch(url)
  const verses = await response.json()
  console.log(`Ayat count: ${verses.verses.length}`)
  return verses.verses
}

export default async function AyaListPage({ params: { surahId } }) {
  const ayat = await getVerses(surahId)
  console.log(`Ayat count for Surah #${surahId}: ${ayat.length}`)
  return (
    <>
      <RevalidateButton surahId={surahId} />
      <ul style={{ direction: "rtl" }}>
        {ayat.map((aya, i) => (
          <li key={aya.id}>
            {aya.text_uthmani} ({i + 1})
          </li>
        ))}
      </ul>
    </>
  )
}
