import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"

const mdxSource = docs.toFumadocsSource()
const filesMaybeFn = (mdxSource as any).files
const filesArray =
  typeof filesMaybeFn === "function" ? filesMaybeFn() : filesMaybeFn

export const source: ReturnType<typeof loader> = loader({
  baseUrl: "/docs",
  source: { files: filesArray },
})
