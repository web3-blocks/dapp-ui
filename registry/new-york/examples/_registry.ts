import { type Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "account-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/account-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
