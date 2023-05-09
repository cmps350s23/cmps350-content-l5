import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/cats">Cats</Link>
          </li>
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/files">File Explorer</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
