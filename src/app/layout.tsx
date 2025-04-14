import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jarvis Panel',
  description: 'Управление таргетированной рекламой',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-black">{children}</body>
    </html>
  )
}