import { env } from "@/lib/env";
import { buildWispClient } from "@wisp-cms/client";

export const wispConfig = buildWispClient({
  baseUrl: "https://www.wisp.blog",
  blogId: env.NEXT_PUBLIC_WISP_BLOG_ID,
});
