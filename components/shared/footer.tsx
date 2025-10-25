import { env } from "@/lib/env";
import { Wrapper } from "./wrapper";

export const Footer = () => {
  return (
    <footer className="relative">
      <Wrapper className="flex size-full items-center justify-center border-dashed py-6 md:justify-between md:border-x md:py-8">
        <p className="text-muted-foreground text-center text-xs md:text-sm">
          Built by{" "}
          <a
            target="_blank"
            href={`https://x.com/${env.NEXT_PUBLIC_CREATOR}`}
            className="text-foreground relative font-medium"
          >
            <span>Holiday</span>
            <span className="bg-foreground absolute -bottom-1 left-0 h-px w-full" />
          </a>
          . The source code is available on{" "}
          <a
            target="_blank"
            href={env.NEXT_PUBLIC_GITHUB_URL}
            className="text-foreground relative font-medium"
          >
            <span>GitHub.</span>
            <span className="bg-foreground absolute -bottom-1 left-0 h-px w-full" />
          </a>
        </p>
      </Wrapper>
    </footer>
  );
};
