import Link from "next/link"
import styles from "./header.module.css"
const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About",
    route: "/about",
  },
  {
    label: "Posts",
    route: "/posts",
  },
  {
    label: "Notes",
    route: "/notes",
  }
]

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li className={styles.navigationItem} key={route}>
              <Link href={route}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
