import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pabbly YouTube to TikTok Automation',
  description: 'Automated workflow to find, download, and schedule YouTube videos to TikTok',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
