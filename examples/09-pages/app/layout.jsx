import Header from "./components/Header"
import "./globals.css"
export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body>
     {/*    <Header />  */}
        {children}
      </body>
    </html>
  )
}
