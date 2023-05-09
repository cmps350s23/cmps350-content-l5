import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Prisma Demos",
  description: "Prisma & Server Action Demos using Cats and Blog Posts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="root-layout">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
