import { registryItemSchema, type Registry } from "shadcn/schema"
import { z } from "zod"

// Shared between index and style for backward compatibility.
const NEW_YORK_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
}
export const registry = {
  name: "dApp/ui",
  homepage: "https://dappui.vercel.app",
  items: z.array(registryItemSchema).parse([
    {
      name: "index",
      ...NEW_YORK_STYLE,
    },
    {
      name: "style",
      ...NEW_YORK_STYLE,
    },
  ]),
} satisfies Registry
