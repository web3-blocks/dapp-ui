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
            width="246"
            height="246"
            viewBox="0 0 246 246"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="246" height="246" rx="123" fill="black" />
            <path
              d="M79.0184 123.213L46.0263 141.046L79.0184 158.879L123 182.656L166.982 158.879L199.974 141.046L166.982 123.213M79.0184 123.213L123 146.99L166.982 123.213M79.0184 123.213L46.0263 105.38L123 63.7704L199.974 105.38L166.982 123.213"
              stroke="white"
              strokeWidth="12.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
