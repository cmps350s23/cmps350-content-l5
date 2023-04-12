"use client"
import {useState, useEffect} from "react"

export default function AyaList({surahId}) {
    const [ayat, setAyat] = useState([])

    //Gets auto-executed every time selectedSurah changes
    useEffect(() => {
        async function getVerses(surahId) {
            if (surahId == 0) return []
            const url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`
            const response = await fetch(url)
            const verses = await response.json()
            return  verses.verses
        }

        console.log(`selectedSurah is now ${surahId}`)
        getVerses(surahId).then(verses => setAyat(verses))

    }, [surahId])

    return (
        <ul style= { { direction: "rtl" }}>
            {ayat.map((aya, i) =>
                <li key={aya.id}>
                    {aya.text_uthmani} ({i+1})
                </li>
            )}
        </ul>
    )
}