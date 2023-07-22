import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: 'Dribble-clone',
  description: 'Post your talent.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
       
       <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
