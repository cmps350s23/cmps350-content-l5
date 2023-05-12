import Welcome from "./components/Welcome";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Welcome appName="Next.js demo of key features"></Welcome>
      <br />
      <Link href="/useState">useState demo: Bulb (click to turn on/off)</Link>
      <br />
      <Link href="/useRef">
        useRef demo (Focus the input element when the component mounts)
      </Link>
      <br />
      <Link href="/useEffect">useEffect demo</Link>
      <br />
      <Link href="/listMap">
        Using .map to display a list (in a server-side component)
      </Link>
      <br />
      <Link href="/props">
        Passing props from a parent to a child component
      </Link>
      <br />
      <Link href="/useRouter">useRouter demo (List accounts by type)</Link>
      <br />
      <Link href="/surahExplorer">Surah Explorer: parent-child demo</Link>
      <br />
      <Link href="/links">Links example</Link>
      <br />
      <Link href="/children">Pass props and children to a component</Link>
      <br />
      <Link href="/forms">Forms example</Link>
      <br />
      <Link href="/posts">Posts example</Link>
      <br />
      <Link href="/notes">Notes example</Link>
      <br />
    </main>
  );
}
