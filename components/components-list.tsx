import Link from "next/link"

import { source } from "@/lib/source"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/new-york-v4/ui/empty"
import { IconFolderCode } from "@tabler/icons-react"

export function ComponentsList() {
  const components = source.pageTree.children.find(
    (page) => page.$id === "components"
  )

  if (components?.type !== "folder") {
    return
  }

  const list = components.children.filter(
    (component) => component.type === "page"
  )

  if (!list.length)
    return (
      <Empty className="mt-10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode />
          </EmptyMedia>
          <EmptyTitle>No Components Yet</EmptyTitle>
          <EmptyDescription>
            We are working on adding more components.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
      {list.map((component, index) => (
        <Link
          key={component.$id || index}
          href={component.url}
          className="text-lg font-medium underline-offset-4 hover:underline md:text-base"
        >
          {component.name}
        </Link>
      ))}
    </div>
  )
}
