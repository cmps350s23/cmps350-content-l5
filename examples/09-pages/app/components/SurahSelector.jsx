"use client"
import {useState, useEffect, memo} from "react"

 function SurahSelector({onSurahSelected}) {
    const [surahs, setSurahs] = useState([])

     useEffect(() => {
        console.log('SurahSelector re-rendered!!!')
    })

    //Invoked only one time when the component is first mounted to the DOM.
    useEffect(() => { 
        async function getSurahs() {
            const url = "https://api.quran.com/api/v4/chapters"
            const response = await fetch(url)
            const surahs = await response.json()
            console.log(`Surah count: ${surahs.chapters.length}`)
            return  surahs.chapters
        }

        //console.log(`I just mounted!`)
        getSurahs().then(surahList => setSurahs(surahList))
    }, [])

    return (
        <>
            <label htmlFor="surahDD">Surah</label>
            <select id="surahDD" onChange={(e) => {
                      console.dir(e)
                      onSurahSelected(e.target.value)
                    }
                }>
                <option value="0"></option>
                {surahs.map(surah =>
                    <option value={surah.id} key={surah.id}>
                        {surah.name_arabic} - {surah.name_simple}
                    </option>
                )}
            </select>
        </>
    )
}

export default memo(SurahSelector)