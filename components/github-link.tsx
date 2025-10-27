import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Icons } from "@/components/icons"
import { Button } from "@/registry/new-york/ui/button"
import { Skeleton } from "@/registry/new-york/ui/skeleton"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Icons.gitHub />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  const data = await fetch(siteConfig.links.githubApi, {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  })
  const result = await data.json()

  const json = result.find(({ id }: { id: number }) => id === 1083171961)

  return (
    <span className="text-muted-foreground mt-px text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  )
}
