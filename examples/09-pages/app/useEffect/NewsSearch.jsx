"use client"
import { useState, useEffect } from "react"

export default function NewsSearch(props) {
    const [news, setNews] = useState([])
    const [query, setQuery] = useState(props.query)

    useEffect(() => {
        async function fetchData() {
            const url = `https://hn.algolia.com/api/v1/search?query=${query}`
            const response = await fetch(url)
            const data = await response.json()
            //console.log(data.hits)
            setNews(data.hits)
        }

        fetchData()
    }, [query])

    return <>
            <label>
                Search news:
                <input value={query} onChange={e => setQuery(e.target.value)} />
            </label>
            <ul>
                {news.map(item => (
                    <li key={item.objectID}>
                        <a href={item.url} target="_blank">{item.title}</a>
                    </li>
                ))}
            </ul>
        </>
}