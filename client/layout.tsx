import React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-['PP_Pangaia']">{children}</body>
    </html>
  )
}

