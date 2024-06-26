import './globals.css'
import { Inter, Roboto } from 'next/font/google'
import { ToasterContext } from './context/ToasterContext'
import { AuthContext } from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

// const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: '400',
  preload: false,
})

export const metadata = {
  title: 'DM_me',
  description: 'Direct Messenger for anyone everywhere',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
