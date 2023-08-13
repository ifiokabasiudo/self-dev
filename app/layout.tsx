import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become',
  description: 'Are you ready to become....',
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
