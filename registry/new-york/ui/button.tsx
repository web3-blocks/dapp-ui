import React from "react"

import { Button as ShadcnButton } from "@/components/ui/button"

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ShadcnButton>{children}</ShadcnButton>
    </div>
  )
}
