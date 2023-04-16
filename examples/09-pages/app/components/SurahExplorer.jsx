"use client"
import {useState} from "react"
import AyaList from "./SurahAyaList"
import SurahSelector from "./SurahSelector"

export default function SurahExplorer() {
    const [selectedSurah, setSelectedSurah] = useState(0)

    return (
        <>
            <SurahSelector onSurahSelected={surahId => setSelectedSurah(surahId)}/>
            <AyaList surahId={selectedSurah}/>
        </>
    )
}