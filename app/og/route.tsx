import { ImageResponse } from "next/og"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title")
  const description = searchParams.get("description")

  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-black text-white">
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
        <div tw="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
        <div tw="flex absolute flex-row bottom-24 right-24 text-white">
          <svg
            width="100"
            height="54"
            viewBox="0 0 100 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="17" width="49" height="14" fill="currentColor" />
            <rect y="14" width="17" height="13" fill="currentColor" />
            <rect x="66" y="14" width="17" height="13" fill="currentColor" />
            <rect
              x="83"
              y="54"
              width="49"
              height="14"
              transform="rotate(180 83 54)"
              fill="currentColor"
            />
            <rect
              x="100"
              y="40"
              width="17"
              height="13"
              transform="rotate(180 100 40)"
              fill="currentColor"
            />
            <rect
              x="34"
              y="40"
              width="17"
              height="13"
              transform="rotate(180 34 40)"
              fill="currentColor"
            />
          </svg>
        </div>
        <div tw="flex flex-col absolute w-[896px] justify-center inset-32">
          <div
            tw="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
            style={{
              textWrap: "balance",
              fontWeight: 600,
              fontSize: title && title.length > 20 ? 64 : 80,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </div>
          <div
            tw="text-[40px] leading-[1.5] flex-grow-1 text-stone-400"
            style={{
              fontWeight: 500,
              textWrap: "balance",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
    }
  )
}
