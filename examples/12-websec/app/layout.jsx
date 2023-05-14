import AppBar from "./components/AppBar"
import "./globals.css"
import UserInfoProvider from "./components/UserInfoProvider"

export const metadata = {
  title: "Next-Auth Demo",
  description: "Example to demonstrate Next-Auth features",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserInfoProvider>
          <AppBar />
          {children}
        </UserInfoProvider>
      </body>
    </html>
  )
}
