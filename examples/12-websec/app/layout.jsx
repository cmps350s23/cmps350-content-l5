import NavBar from "./components/NavBar"
import "./globals.css"
import UserInfoProvider from "./components/UserInfoProvider"

export const metadata = {
  title: "Next-Auth Demo",
  description: "Example to demonstrate Next-Auth features",
}

export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
